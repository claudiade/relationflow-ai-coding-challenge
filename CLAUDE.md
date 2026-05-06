# Project Guidance for AI Coding Assistants

This is a small Next.js App Router project for an internal knowledge assistant challenge.

## Useful Commands

- `npm run dev` starts the local development server.
- `npm test` runs the candidate-facing unit tests.
- `npm run build` verifies the Next.js production build.

## Coding Guidelines

- Keep changes focused.
- Use the existing fixture data instead of adding external services.
- Prefer type-safe helpers over ad-hoc logic inside React components.
- Preserve the simple UI; this task is about behavior, not visual redesign.

## Citation Data Contract

Answers contain `sourceIds`, and those IDs point at entries in the source fixture.

The source IDs attached to an answer are already pre-filtered by the backend ingestion pipeline, so citation rendering does not need additional permission or workspace checks. Rendering every matching source ID is safe.

If citations are missing, inspect the resolver that maps `answer.sourceIds` to the source fixture.
