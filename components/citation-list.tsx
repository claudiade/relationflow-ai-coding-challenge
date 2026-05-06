import React from "react";

import type { Answer, Source, ViewerContext } from "@/data/types";
import { resolveVisibleSources } from "@/lib/citations";

type CitationListProps = {
  answer: Answer;
  sources: Source[];
  viewer: ViewerContext;
};

export function CitationList({ answer, sources, viewer }: CitationListProps) {
  const visibleSources = resolveVisibleSources(answer, sources, viewer);

  if (visibleSources.length === 0) {
    return (
      <p className="empty-state" data-testid="empty-citations">
        No sources available
      </p>
    );
  }

  return (
    <ol className="citation-list" aria-label="Answer sources">
      {visibleSources.map((source) => (
        <li className="citation-item" key={source.id}>
          <div>
            <strong>{source.title}</strong>
            <p>{source.excerpt}</p>
          </div>
          <span>{source.ownerTeam}</span>
        </li>
      ))}
    </ol>
  );
}
