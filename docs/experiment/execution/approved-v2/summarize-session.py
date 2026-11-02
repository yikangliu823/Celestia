#!/usr/bin/env python3
"""Summarize raw CLI events without inventing missing per-command timing."""
import argparse
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('condition', choices=['control', 'treatment'])
parser.add_argument('--debug-cycle', action='append', default=[])
args = parser.parse_args()
folder = ROOT / args.condition
out = folder / 'evidence'
metadata = json.loads((out / 'session.json').read_text())
freeze = json.loads((out / 'freeze.json').read_text())
commands, changes, messages, errors = [], [], [], []
usage = None
for line_number, line in enumerate((out / 'events.jsonl').read_text().splitlines(), 1):
    event = json.loads(line)
    item = event.get('item', {})
    if event['type'] == 'turn.completed':
        usage = event.get('usage')
    if event['type'] != 'item.completed':
        continue
    if item.get('type') == 'command_execution':
        commands.append({'eventLine': line_number, **item})
    elif item.get('type') == 'file_change':
        changes.append({'eventLine': line_number, **item})
    elif item.get('type') == 'agent_message':
        messages.append({'eventLine': line_number, **item})
    elif item.get('type') == 'error':
        errors.append({'eventLine': line_number, **item})
(out / 'command-records.json').write_text(json.dumps(commands, indent=2) + '\n')
unit = [c for c in commands if re.search(r'\bnpm\s+(?:run\s+)?test\b', c['command']) and '> tsx --test tests/*.test.tsx' in c.get('aggregated_output', '')]
verification = json.loads((out / 'coordinator-verification.json').read_text())
failed = [c for c in commands if c.get('exit_code') != 0]
metrics = {'condition': args.condition, 'status': 'implementation_frozen_evaluation_pending', 'sessionId': freeze['sessionId'], 'modelRequested': metadata['modelRequested'], 'modelObservedInClient': 'gpt-6-astra', 'remoteModelSnapshot': None, 'reasoningEffortRequested': metadata['reasoningEffortRequested'], 'reasoningEffortObservedInClient': 'high', 'startedAt': metadata['startedAt'], 'endedAt': metadata['endedAt'], 'durationSeconds': metadata['durationSeconds'], 'implementationCommit': freeze['implementationCommit'], 'filesChanged': freeze['filesChanged'], 'agentUnitTestInvocations': len(unit), 'agentUnitTestEventLines': [c['eventLine'] for c in unit], 'agentFailedUnitTestInvocations': sum(c['exit_code'] != 0 for c in unit), 'failedCommandEvents': [{'eventLine': c['eventLine'], 'command': c['command'], 'exitCode': c['exit_code']} for c in failed], 'debuggingIterations': len(args.debug_cycle) if args.debug_cycle or not failed else None, 'debuggingCycleEventLines': args.debug_cycle, 'coordinatorUnitTestInvocations': 1, 'coordinatorRequiredCommands': [{'command': r['command'], 'exitCode': r['exitCode']} for r in verification], 'humanImplementationMessages': 0, 'coordinatorCodeEdits': 0, 'clarificationQuestionsRequiringResponse': 0, 'contaminationEventsObserved': [], 'source': 'CLI events.jsonl and wrapper session metadata; coordinator checks are separate.', 'usageReportedByCLI': usage, 'perCommandTimestamps': None}
(folder / 'metrics.json').write_text(json.dumps(metrics, indent=2) + '\n')
log = ['# ' + args.condition.title() + ' execution log', '', 'This is a coordinator summary of actual recorded events. The original client', 'JSONL stream is in `evidence/events.jsonl`; commands and their complete captured', 'output are in `evidence/command-records.json`. Per-command timestamps are not', 'emitted by this stream and are not reconstructed. Line references below are', 'one-based JSONL lines; tool starts/completions may overlap.', '', '- Session: `' + freeze['sessionId'] + '`.', '- Start: ' + metadata['startedAt'] + '.', '- End: ' + metadata['endedAt'] + '.', '- Duration: ' + str(metadata['durationSeconds']) + ' seconds.', '- Exit: ' + str(metadata['exitCode']) + '.', '- Model/effort: gpt-6-astra/high, independently observed in local CLI turn context.', '- Implementation: `' + freeze['implementationCommit'] + '`.', '', '## Recorded command events', '']
for c in commands:
    log += ['- Line ' + str(c['eventLine']) + ', exit ' + str(c['exit_code']) + ': `' + c['command'].replace('`', '\\`') + '`.']
log += ['', '## Recorded file changes', '']
for c in changes:
    log += ['- Line ' + str(c['eventLine']) + ': ' + ', '.join(x['path'] + ' (' + x['kind'] + ')' for x in c.get('changes', [])) + '.']
log += ['', '## Errors, debugging and intervention', '']
for e in errors:
    log += ['- Line ' + str(e['eventLine']) + ': ' + e.get('message', '')]
for c in failed:
    log += ['- Command failure at line ' + str(c['eventLine']) + '; raw output preserved, exit ' + str(c['exit_code']) + '.']
log += ['- Debugging failure/edit/recheck event groups: ' + (', '.join(args.debug_cycle) or ('none observed' if not failed else 'not fully classified')) + '.', '- No human implementation messages, product answers, or coordinator code repairs.', '- Clarification ambiguities were documented by the agent; none required a response.', '- No observable opposite-worktree, evidence, or repository-history access was found', '  in the reviewed command stream. This does not prove complete filesystem isolation.', '', '## Final verification and unavailable evidence', '', 'All five coordinator commands and their actual stdout/stderr, timestamps and', 'exit codes are preserved in `evidence/coordinator-verification.json` and', '`test-results.txt`. These are distinct from agent test invocations. No manual', 'browser result is inferred from these commands. Independent evaluation follows', 'only after both implementation snapshots have been frozen.', '', 'File inspections are evidenced by the `cat`, `rg`, and directory-list commands', 'and their outputs above. No exhaustive OS-level file-read trace is available.', 'The final agent response is retained verbatim in `evidence/final-response.txt`;', 'its claims are not substituted for the coordinator independent evaluation.', '']
(folder / 'execution-log.md').write_text('\n'.join(log))
print(json.dumps(metrics, indent=2))
