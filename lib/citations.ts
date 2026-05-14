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

  if (source.visibility === "internal") {
    return context.role === "admin" && context.isInternalEmployee;
  }

  return true;
}

export function canUseEvidence(
  evidence: EvidenceChunk,
  source: Source,
  context: ViewerContext
): boolean {
  if (evidence.status !== "verified") {
    return false;
  }

  return canViewSource(source, context);
}

export function applyRedactions(
  excerpt: string,
  redactions: EvidenceRedaction[] | undefined,
  context: ViewerContext
): string {
  void redactions;
  void context;
  return excerpt;
}

export function resolveCitations(
  answer: Answer,
  evidenceChunks: EvidenceChunk[],
  allSources: Source[],
  context: ViewerContext
): CitationResolution {
  void context;

  const evidenceById = new Map(evidenceChunks.map((evidence) => [evidence.id, evidence]));
  const sourcesById = new Map(allSources.map((source) => [source.id, source]));
  const citationBySourceId = new Map<string, ResolvedCitation>();
  const citations: ResolvedCitation[] = [];
  const evidenceToCitationNumber: Record<string, number> = {};

  // BUG: the legacy resolver trusts retrieval output and groups every matching
  // evidence ID. It misses source policy, time windows, redactions, and unavailable counts.
  for (const reference of answer.evidence) {
    const evidence = evidenceById.get(reference.evidenceId);
    const source = evidence ? sourcesById.get(evidence.sourceId) : undefined;

    if (!evidence || !source) {
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
      excerpt: evidence.excerpt,
      updatedAt: evidence.updatedAt,
      confidence: reference.confidence
    });
    evidenceToCitationNumber[evidence.id] = citation.citationNumber;
  }

  return { citations, unavailableCount: 0, evidenceToCitationNumber };
}
