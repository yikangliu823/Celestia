# Browser evaluation limitations

Both implementation trees were committed and frozen before evaluation-start.json.
Production servers were started sequentially on localhost:3000 from each frozen
worktree. Control initially supported Playwright interaction. The actual returned
observations and arguments are preserved in browser-tool-transcript.json, including
pre-reset results recovered from the coordinator tool record. No lost screenshot
or full DOM snapshot has been reconstructed. control/evidence/browser-records.json
contains two snapshots saved before later interaction failures.

Control initial observations: all three labels/controls present; empty submission
produced actionable errors and focused date. An impossible 2024-02-30 date produced
an error; correction to 2024-02-29 cleared errors and produced format-only success.
A complete synthetic 2000-01-15 / 14:30 / America/Los_Angeles entry also succeeded.
These limited observations support the individual recorded cases, not a complete
end-to-end claim or a balanced comparison.

F03 remains unresolved: the first batch's empty-date case errored, but its empty-time
and empty-zone cases showed success. The evaluator did not capture rendered values
after fill("") or independently establish that React state cleared. This is a
potential application or automation anomaly, not a demonstrated application failure.
The attempt to repeat from fresh forms failed at browser interaction. The original
contradictory observations remain in the transcript. F03 is UNVERIFIED and needs a
reliable browser reproduction; it is not silently counted as passing.

The browser tool reset during evaluation, losing unsaved in-memory snapshots.
Subsequent reload/fill calls reached an ERR_CONNECTION_REFUSED browser error page;
the tool rejected that data URL. The evaluator did not bypass the rejection.
Host-side curl returned HTTP 200 from Control's loopback endpoints; IPv6 startup
and fresh tabs did not restore reliable interaction. Treatment's production server
also returned HTTP 200 on localhost. Initial Treatment tab creation returned its
accessible labels, but subsequent native click/read/screenshot calls failed with
`browser.user is unavailable`. No Treatment submit interaction was completed.
Only the in-app browser and an MCP Apps surface were available; no alternative
web browser was connected. Failed browser interactions are infrastructure/setup
limitations, not application FAIL results.

Browser identity changed from Codex in-app browser to ChatGPT in-app browser in
tool inventory. Exact engine version, zoom, locale/timezone, and fresh isolated
browser-context creation could not be verified. Read-only DOM evaluation did not
expose navigator; storage/network observation was unavailable. The requested
1280x800 override was set, but the 390x844 reflow check and keyboard/visual checks
were not completed. The temporary viewport override was reset. No screenshot was
successfully saved, and no screenshot or screen-reader result is claimed.

One initial coordinator server start used the evidence worktree and failed with
`next: command not found`; evaluator-setup-errors.json preserves that setup error.
All later servers used the appropriate frozen worktrees. The coordinator stopped
its running Control IPv4/IPv6 and Treatment IPv4 servers after evaluation.

The run order was Treatment then Control, while evaluation started with Control.
Browser availability became unequal; raw pass counts are not comparative quality
scores. Original criteria are unchanged. The owner's requested UNVERIFIED label
supersedes the earlier label for unavailable evidence, without changing the oracle.
