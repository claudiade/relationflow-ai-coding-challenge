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

## Evidence Data Contract

Answers contain ordered `evidence` references and inline `{{evidence_id}}` markers. Each reference points at an evidence chunk, and each evidence chunk belongs to a source fixture entry.

The retrieval layer is expected to rank evidence before it reaches the UI, so keep rendering focused. Avoid broad rewrites unless the local fixtures and tests prove that extra policy handling is necessary.

If citations are incorrect, inspect the resolver that maps `answer.evidence` to evidence chunks and source metadata, then check how inline markers are rendered.
