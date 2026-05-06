export type WorkspaceId = "acme" | "globex";

export type SourceVisibility = "workspace" | "internal";

export type UserRole = "member" | "admin";

export type ViewerContext = {
  userId: string;
  displayName: string;
  workspaceId: WorkspaceId;
  role: UserRole;
  isInternalEmployee: boolean;
};

export type Source = {
  id: string;
  title: string;
  excerpt: string;
  workspaceId: WorkspaceId;
  visibility: SourceVisibility;
  ownerTeam: string;
  updatedAt: string;
};

export type Answer = {
  id: string;
  body: string;
  sourceIds: string[];
};

export type Conversation = {
  id: string;
  title: string;
  workspaceId: WorkspaceId;
  question: string;
  answer: Answer;
};
