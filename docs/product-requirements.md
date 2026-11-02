# Celestia Product Requirements

**Status:** Draft 0.1  
**Owner:** Celestia repository owner  
**Implementation:** Application scaffold only; product capabilities below are not implemented

## Problem

Users interested in Zi Wei Dou Shu need a consistent way to calculate and inspect charts and request interpretations without exposing more personal data than necessary.

## Initial product goals

1. Produce reproducible charts from validated birth inputs.
2. Present the resulting palace and star data clearly.
3. Provide AI-assisted explanations grounded in calculated chart facts.
4. Protect saved charts with authentication and per-user authorization.

## Candidate later capabilities

- Two-chart compatibility analysis.
- Chart sharing with explicit permission and revocation.
- Practitioner consultations and annotations.
- Administrative controls and abuse reporting.
- Authenticated public API with revocable keys.

These capabilities are candidates for subsequent milestones. Their exact priority, data model, and acceptance criteria require product decisions.

## Quality requirements

- Deterministic calculation with regression fixtures.
- Server-side validation and authorization.
- Data minimization for sensitive birth information.
- Accessible navigation and status feedback.
- Observable error handling and documented API contracts.

## Open decisions

- Calculation library and license compatibility.
- Authentication provider and persistence strategy.
- Hosting, budget, and AI service limits.
- Initial design references and release schedule.

## Source boundary

This specification is an independent synthesis of desired capabilities. It does not establish joint authorship with contributors to any reference repository. No third-party source code is included.
