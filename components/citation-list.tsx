import React from "react";

import type { CitationResolution } from "@/lib/citations";

type CitationListProps = {
  resolution: CitationResolution;
};

export function CitationList({ resolution }: CitationListProps) {
  const { citations, unavailableCount } = resolution;
  const unavailableLabel =
    unavailableCount === 1 ? "1 source unavailable" : `${unavailableCount} sources unavailable`;

  if (citations.length === 0) {
    return (
      <div className="citation-state">
        <p className="empty-state" data-testid="empty-citations">
          No sources available
        </p>
        {unavailableCount > 0 ? (
          <p className="unavailable-state" data-testid="unavailable-citations">
            {unavailableLabel}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="citation-state">
      <ol className="citation-list" aria-label="Answer sources">
        {citations.map((citation) => (
          <li className="citation-item" data-testid="citation-card" key={citation.id}>
            <div>
              <strong>
                [{citation.citationNumber}] {citation.title}
              </strong>
              <ul className="evidence-list" aria-label={`${citation.title} evidence`}>
                {citation.evidence.map((evidence) => (
                  <li data-testid="evidence-snippet" key={evidence.id}>
                    <p>{evidence.excerpt}</p>
                    <span>{evidence.confidence} confidence</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="citation-meta">
              <span>{citation.ownerTeam}</span>
              <span>{citation.updatedAt}</span>
            </div>
          </li>
        ))}
      </ol>
      {unavailableCount > 0 ? (
        <p className="unavailable-state" data-testid="unavailable-citations">
          {unavailableLabel}
        </p>
      ) : null}
    </div>
  );
}
