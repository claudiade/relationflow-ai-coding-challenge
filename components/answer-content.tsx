import React from "react";

import type { Answer } from "@/data/types";
import type { CitationResolution } from "@/lib/citations";

type AnswerContentProps = {
  answer: Answer;
  resolution: CitationResolution;
};

const evidenceMarkerPattern = /\{\{([^}]+)\}\}/g;

export function AnswerContent({ answer, resolution }: AnswerContentProps) {
  const parts = answer.body.split(evidenceMarkerPattern);

  return (
    <p>
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          return <React.Fragment key={`${index}-${part}`}>{part}</React.Fragment>;
        }

        const citationNumber = resolution.evidenceToCitationNumber[part];

        if (!citationNumber) {
          return null;
        }

        return (
          <sup aria-label={`Citation ${citationNumber}`} key={`${index}-${part}`}>
            [{citationNumber}]
          </sup>
        );
      })}
    </p>
  );
}
