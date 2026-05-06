# Internal Knowledge Assistant Challenge

Welcome. This repository is a 60-minute engineering challenge for senior product engineers working with AI-assisted development tools.

The app is a small Next.js internal knowledge assistant. A conversation answer should show the sources it cites, but the current implementation always renders `No sources available`.

## Your Task

Fix citation rendering so answers show their linked sources.

Please submit a pull request that includes:

- The code change.
- Any tests you believe are necessary.
- A short PR note answering:
  - What did you change?
  - What did you test?
  - Did you find any misleading or outdated project guidance?

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

At the start of the challenge, one test is expected to fail. Your PR should make the candidate-facing test suite pass.

## Constraints

- Keep the fixture-only architecture. Do not add a database, auth provider, API server, or external service.
- Prefer a small, well-tested fix over a broad refactor.
- The app should remain understandable to another engineer reviewing the PR.
