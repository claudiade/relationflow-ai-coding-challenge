import type { Answer, Source, ViewerContext } from "@/data/types";

export function canViewSource(source: Source, context: ViewerContext): boolean {
  if (source.workspaceId !== context.workspaceId) {
    return false;
  }

  if (source.visibility === "internal") {
    return context.role === "admin" && context.isInternalEmployee;
  }

  return true;
}

export function resolveVisibleSources(
  answer: Answer,
  allSources: Source[],
  context: ViewerContext
): Source[] {
  void answer;
  void allSources;
  void context;

  // BUG: the legacy resolver still expects pre-resolved citation records.
  // Answers now provide sourceIds, so the UI always falls back to its empty state.
  return [];
}
