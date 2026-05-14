## What changed?

**`lib/citations.ts`** — all logic changes:

- `canViewSource`: added region check (`"global"` sources are visible to all regions; otherwise source region must match viewer region) and required-groups check (viewer must hold every group in `source.requiredGroups`).
- `canUseEvidence`: added `asOf: string` parameter and date-window checks — excludes evidence where `validFrom > asOf` (embargoed) or `validUntil < asOf` (expired).
- `applyRedactions`: new helper that replaces sensitive text in an excerpt when the viewer lacks the required group, leaving the excerpt unchanged when the viewer has access or no redactions are defined.
- `resolveCitations`: removed `void context`; wires `canUseEvidence` into the loop to filter evidence; increments `unavailableCount` for every skipped reference (missing evidence, missing source, or failed access check); applies `applyRedactions` to visible evidence excerpts before returning them.

**`test/citations.test.tsx`** — new unit tests:

- `canViewSource`: happy path, wrong workspace, archived source, internal source, region mismatch, missing required group, partial required groups.
- `canUseEvidence`: future `validFrom`, expired `validUntil`, stale status.
- `applyRedactions`: viewer lacks required group, viewer has required group, no redactions defined.

## What did you test?

- `npm test` — all 19 tests pass, including the 5 original candidate tests and 14 new unit tests.
- `npm run build` — production build completes without errors.
- Manually reviewed fixture data to verify the 8 unavailable evidence references in the onboarding conversation match expectations (wrong workspace, archived source, internal source, missing group, wrong region, missing ID, stale status, future `validFrom`).

## Session log

- [x] `SESSION.md` is completed.

## Final commit SHA

5d94f9643dd0332600b2a0e56c7a82eb524418ad
