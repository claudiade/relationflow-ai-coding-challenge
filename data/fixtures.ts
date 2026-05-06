import type { Conversation, Source, ViewerContext } from "@/data/types";

export const viewer: ViewerContext = {
  userId: "user_1042",
  displayName: "Mara Chen",
  workspaceId: "acme",
  role: "member",
  isInternalEmployee: false
};

export const sources: Source[] = [
  {
    id: "src_acme_onboarding",
    title: "Acme Onboarding Playbook",
    excerpt: "Engineering onboarding includes the production access checklist and first-week support rotation.",
    workspaceId: "acme",
    visibility: "workspace",
    ownerTeam: "People Ops",
    updatedAt: "2026-04-14"
  },
  {
    id: "src_acme_internal_comp",
    title: "Acme Compensation Calibration",
    excerpt: "Internal-only notes for manager compensation calibration and promotion packet review.",
    workspaceId: "acme",
    visibility: "internal",
    ownerTeam: "People Ops",
    updatedAt: "2026-04-18"
  },
  {
    id: "src_globex_onboarding",
    title: "Acme Onboarding Playbook",
    excerpt: "Globex workspace copy used during a migration dry-run. It must never appear in Acme answers.",
    workspaceId: "globex",
    visibility: "workspace",
    ownerTeam: "Migration Team",
    updatedAt: "2026-03-30"
  },
  {
    id: "src_globex_security",
    title: "Globex Security Exception Log",
    excerpt: "Security exception notes for the Globex workspace.",
    workspaceId: "globex",
    visibility: "internal",
    ownerTeam: "Security",
    updatedAt: "2026-04-02"
  }
];

export const conversations: Conversation[] = [
  {
    id: "conv_onboarding",
    title: "First week engineering onboarding",
    workspaceId: "acme",
    question: "What should a new senior engineer do during their first week?",
    answer: {
      id: "ans_onboarding",
      body:
        "New senior engineers should complete the production access checklist, shadow the support rotation, and schedule onboarding sessions with People Ops and their engineering lead.",
      sourceIds: [
        "src_acme_onboarding",
        "src_acme_internal_comp",
        "src_globex_onboarding",
        "src_deleted_policy"
      ]
    }
  },
  {
    id: "conv_missing_sources",
    title: "Archived migration policy",
    workspaceId: "acme",
    question: "Can we rely on the archived migration policy?",
    answer: {
      id: "ans_missing_sources",
      body:
        "The archived migration policy is no longer available in this workspace. Ask the platform team for the current process.",
      sourceIds: ["src_deleted_policy"]
    }
  },
  {
    id: "conv_no_sources",
    title: "Informal meeting summary",
    workspaceId: "acme",
    question: "What was decided in the informal sync?",
    answer: {
      id: "ans_no_sources",
      body: "No durable source was attached to this informal summary.",
      sourceIds: []
    }
  }
];
