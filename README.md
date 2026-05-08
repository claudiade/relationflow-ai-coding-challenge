# Internal Knowledge Assistant Challenge

Welcome. This repository is a 3-4 hour engineering challenge for senior product engineers working with AI-assisted development tools.

The app is a small Next.js internal knowledge assistant. Assistant answers contain inline evidence markers, evidence chunks, and source documents. The current implementation renders unsafe or unavailable evidence as if it were visible to the current viewer.

## Your Task

Fix evidence-backed citation rendering so the answer body and source list show only the evidence the current viewer can safely use.

Your solution should:

- Resolve `answer.evidence` entries to evidence chunks by exact ID.
- Preserve the answer's evidence order.
- Group visible evidence by source, using the first visible evidence item to determine citation order.
- Replace inline `{{evidence_id}}` markers with citation numbers only when that evidence is visible.
- Show source metadata and ordered evidence snippets for visible, verified evidence.
- Exclude missing, stale, future-dated, archived, cross-workspace, wrong-region, missing-group, and restricted internal evidence.
- Apply evidence redactions when the viewer lacks the required group for sensitive text.
- Show a count of unavailable sources without leaking their titles, excerpts, owners, or workspace.
- Add or update tests for the behavior you rely on.
- Complete `SUBMISSION.md`.

## Submission

Do not open a pull request against the public challenge repository.

Relationflow will invite you to a private candidate repository for your attempt. Commit your work there, push it, and complete `SUBMISSION.md` with:

- What changed.
- What you tested.
- The final commit SHA we should evaluate.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Tests

```bash
npm test
```

Some candidate-facing tests are expected to fail at the start of the challenge. Your solution should make the candidate-facing test suite pass.

## Constraints

- Keep the fixture-only architecture. Do not add a database, auth provider, API server, or external service.
- Treat the TypeScript types and fixtures as the source of truth.
- Prefer a small, well-tested fix over a broad refactor.
- The app should remain understandable to another engineer reviewing the submission.
