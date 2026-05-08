export type WorkspaceId = "acme" | "globex" | "initech";

export type SourceVisibility = "workspace" | "internal";

export type SourceStatus = "active" | "archived";

export type EvidenceStatus = "verified" | "stale";

export type EvidenceConfidence = "high" | "medium" | "low";

export type UserRole = "member" | "admin";

export type Region = "global" | "us" | "eu";

export type AccessGroup = "hr" | "security" | "finance" | "legal";

export type SourceClassification = "standard" | "sensitive";

export type EvidenceRedaction = {
  text: string;
  replacement: string;
  visibleToGroups: AccessGroup[];
};

export type ViewerContext = {
  userId: string;
  displayName: string;
  workspaceId: WorkspaceId;
  role: UserRole;
  isInternalEmployee: boolean;
  region: Region;
  groups: AccessGroup[];
};

export type Source = {
  id: string;
  title: string;
  workspaceId: WorkspaceId;
  visibility: SourceVisibility;
  status: SourceStatus;
  region: Region;
  classification: SourceClassification;
  requiredGroups: AccessGroup[];
  ownerTeam: string;
  updatedAt: string;
};

export type EvidenceChunk = {
  id: string;
  sourceId: string;
  excerpt: string;
  status: EvidenceStatus;
  updatedAt: string;
  validFrom: string;
  validUntil?: string;
  redactions?: EvidenceRedaction[];
};

export type EvidenceReference = {
  evidenceId: string;
  confidence: EvidenceConfidence;
};

export type Answer = {
  id: string;
  asOf: string;
  body: string;
  evidence: EvidenceReference[];
};

export type Conversation = {
  id: string;
  title: string;
  workspaceId: WorkspaceId;
  question: string;
  answer: Answer;
};
