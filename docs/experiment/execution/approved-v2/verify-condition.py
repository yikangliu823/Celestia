#!/usr/bin/env python3
"""Capture coordinator verification of a completed implementation; never edit code."""
import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import subprocess
import time

ROOT = Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('condition', choices=['control', 'treatment'])
parser.add_argument('--evaluation', action='store_true', help='Record the independent post-freeze verification separately.')
args = parser.parse_args()
settings = json.loads((ROOT / 'amendments/v2/runtime-settings.json').read_text())
condition = settings['conditions'][args.condition]
destination = ROOT / args.condition / 'evidence' / ('evaluation-verification.json' if args.evaluation else 'coordinator-verification.json')
assert not destination.exists(), 'Preserve existing verification; do not overwrite.'
records = []
for command in [['npm', 'ci'], ['npm', 'run', 'typecheck'], ['npm', 'run', 'lint'], ['npm', 'test'], ['npm', 'run', 'build']]:
    start = datetime.now(timezone.utc).isoformat()
    monotonic = time.monotonic()
    result = subprocess.run(command, cwd=condition['worktree'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    records.append({'command': command, 'cwd': condition['worktree'], 'startedAt': start, 'endedAt': datetime.now(timezone.utc).isoformat(), 'durationSeconds': time.monotonic() - monotonic, 'exitCode': result.returncode, 'stdout': result.stdout, 'stderr': result.stderr})
    destination.write_text(json.dumps(records, indent=2) + '\n')
    print(' '.join(command), 'exit', result.returncode, flush=True)
(ROOT / args.condition / ('evaluation-test-results.txt' if args.evaluation else 'test-results.txt')).write_text('\n'.join('COMMAND: ' + ' '.join(r['command']) + '\nSTART: ' + r['startedAt'] + '\nEND: ' + r['endedAt'] + '\nEXIT: ' + str(r['exitCode']) + '\nSTDOUT:\n' + r['stdout'] + '\nSTDERR:\n' + r['stderr'] for r in records))
