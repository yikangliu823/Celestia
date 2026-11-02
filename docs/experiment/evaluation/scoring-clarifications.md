# Pre-execution scoring clarification

Authorized by the execution request, before either implementation. The original
24 cases, evaluation-plan.md, prompt, treatment file, and runtime settings remain
unchanged. scoring-audit.json maps every original ID to a target, observable pass
and failure conditions, N/A handling, and evidence source. It does not add product
requirements. These clarifications are frozen before any implementation.

Use PASS when the applicable original expectation is demonstrated; FAIL when its
observable contradiction is demonstrated. Use N/A for undefined product behavior,
inapplicable representation, or a missing prerequisite. If evidence or browser
interaction is unavailable, label N/A with reason_type=unverified and unverified=true;
report that count separately, never as a pass. An absent form fails F01; dependent
interaction checks are N/A (blocked), not additional speculative failures.

For conjunctive checks, all applicable parts must be demonstrated to pass. One
observed material contradiction is sufficient to fail. A03 accepts accessible
native validation. A04 does not mandate a particular focus target. F05 tests
validation acceptance only; it does not impose a backend or success screen.
E04/E07/E08 test consistency only when the implementation discloses a testable
policy. E09 is N/A for policy correctness. Do not penalize reasonable choices for
unspecified date bounds, location validation, timezone inference, extra chart
fields, or submission behavior. Unknown requirements are not invented.

Q01 keeps the existing six review dimensions and rubric. Document each dimension;
PASS means no material defect was found with evidence for the applicable dimensions,
FAIL requires a concrete demonstrated defect against those dimensions, and N/A is
used if evidence is insufficient. Partial/style disagreements must be described,
not converted into an arbitrary new requirement. This judgment is not a fully
objective measurement; disclose that limitation and lack of blinding.

Engineering process remains descriptive evidence from the frozen metrics policy,
not a new 25th check. Do not use code/file/test/dependency counts, abstraction count,
clarification frequency, or duration as automatic quality scores. Keep original
categories; Calendar/Time/Location cases are input validation, V01 is verification
completeness, and engineering process is reported separately.

Applicable count = PASS + FAIL. Pass rate is PASS / applicable count only when the
denominator is nonzero. Report N/A policy, blocked, and unverified counts distinctly.
