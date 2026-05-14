import type { Answer, EvidenceChunk, EvidenceConfidence, EvidenceRedaction, Source, ViewerContext } from "@/data/types";

export type ResolvedEvidence = {
  id: string;
  excerpt: string;
  updatedAt: string;
  confidence: EvidenceConfidence;
};

export type ResolvedCitation = {
  id: string;
  sourceId: string;
  title: string;
  ownerTeam: string;
  updatedAt: string;
  citationNumber: number;
  evidence: ResolvedEvidence[];
};

export type CitationResolution = {
  citations: ResolvedCitation[];
  unavailableCount: number;
  evidenceToCitationNumber: Record<string, number>;
};

export function canViewSource(source: Source, context: ViewerContext): boolean {
  if (source.workspaceId !== context.workspaceId) {
    return false;
  }

  if (source.status !== "active") {
    return false;
  }

  if (source.region !== "global" && source.region !== context.region) {
    return false;
  }

  if (!source.requiredGroups.every((group) => context.groups.includes(group))) {
    return false;
  }

  if (source.visibility === "internal") {
    return context.role === "admin" && context.isInternalEmployee;
  }

  return true;
}

export function canUseEvidence(
  evidence: EvidenceChunk,
  source: Source,
  context: ViewerContext,
  asOf: string
): boolean {
  if (evidence.status !== "verified") {
    return false;
  }

  if (evidence.validFrom > asOf) {
    return false;
  }

  if (evidence.validUntil !== undefined && evidence.validUntil < asOf) {
    return false;
  }

  return canViewSource(source, context);
}

export function applyRedactions(
  excerpt: string,
  redactions: EvidenceRedaction[] | undefined,
  context: ViewerContext
): string {
  if (!redactions) return excerpt;

  return redactions.reduce((text, redaction) => {
    if (redaction.visibleToGroups.every((group) => context.groups.includes(group))) {
      return text;
    }
    return text.replaceAll(redaction.text, redaction.replacement);
  }, excerpt);
}

export function resolveCitations(
  answer: Answer,
  evidenceChunks: EvidenceChunk[],
  allSources: Source[],
  context: ViewerContext
): CitationResolution {
  const evidenceById = new Map(evidenceChunks.map((evidence) => [evidence.id, evidence]));
  const sourcesById = new Map(allSources.map((source) => [source.id, source]));
  const citationBySourceId = new Map<string, ResolvedCitation>();
  const citations: ResolvedCitation[] = [];
  const evidenceToCitationNumber: Record<string, number> = {};
  let unavailableCount = 0;

  for (const reference of answer.evidence) {
    const evidence = evidenceById.get(reference.evidenceId);
    const source = evidence ? sourcesById.get(evidence.sourceId) : undefined;

    if (!evidence || !source || !canUseEvidence(evidence, source, context, answer.asOf)) {
      unavailableCount++;
      continue;
    }

    let citation = citationBySourceId.get(source.id);

    if (!citation) {
      citation = {
        id: source.id,
        sourceId: source.id,
        title: source.title,
        ownerTeam: source.ownerTeam,
        updatedAt: source.updatedAt,
        citationNumber: citations.length + 1,
        evidence: []
      };
      citationBySourceId.set(source.id, citation);
      citations.push(citation);
    }

    citation.evidence.push({
      id: evidence.id,
      excerpt: applyRedactions(evidence.excerpt, evidence.redactions, context),
      updatedAt: evidence.updatedAt,
      confidence: reference.confidence
    });
    evidenceToCitationNumber[evidence.id] = citation.citationNumber;
  }

  return { citations, unavailableCount, evidenceToCitationNumber };
}
