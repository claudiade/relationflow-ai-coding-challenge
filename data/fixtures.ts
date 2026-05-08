import type { Conversation, EvidenceChunk, Source, ViewerContext } from "@/data/types";

export const viewer: ViewerContext = {
  userId: "user_1042",
  displayName: "Mara Chen",
  workspaceId: "acme",
  role: "member",
  isInternalEmployee: false,
  region: "us",
  groups: ["hr"]
};

export const sources: Source[] = [
  {
    id: "src_acme_onboarding",
    title: "Acme Onboarding Playbook",
    workspaceId: "acme",
    visibility: "workspace",
    status: "active",
    region: "global",
    classification: "standard",
    requiredGroups: ["hr"],
    ownerTeam: "People Ops",
    updatedAt: "2026-04-14"
  },
  {
    id: "src_acme_support_handbook",
    title: "Acme Support Rotation Handbook",
    workspaceId: "acme",
    visibility: "workspace",
    status: "active",
    region: "us",
    classification: "standard",
    requiredGroups: ["hr"],
    ownerTeam: "Engineering Enablement",
    updatedAt: "2026-04-20"
  },
  {
    id: "src_acme_internal_comp",
    title: "Acme Compensation Calibration",
    workspaceId: "acme",
    visibility: "internal",
    status: "active",
    region: "us",
    classification: "sensitive",
    requiredGroups: ["finance"],
    ownerTeam: "People Ops",
    updatedAt: "2026-04-18"
  },
  {
    id: "src_acme_security_playbook",
    title: "Acme Security Escalation Playbook",
    workspaceId: "acme",
    visibility: "workspace",
    status: "active",
    region: "global",
    classification: "sensitive",
    requiredGroups: ["security"],
    ownerTeam: "Security",
    updatedAt: "2026-04-19"
  },
  {
    id: "src_acme_eu_payroll",
    title: "EU Payroll Onboarding Appendix",
    workspaceId: "acme",
    visibility: "workspace",
    status: "active",
    region: "eu",
    classification: "sensitive",
    requiredGroups: ["hr", "finance"],
    ownerTeam: "People Ops",
    updatedAt: "2026-04-11"
  },
  {
    id: "src_globex_onboarding",
    title: "Acme Onboarding Playbook",
    workspaceId: "globex",
    visibility: "workspace",
    status: "active",
    region: "global",
    classification: "standard",
    requiredGroups: ["hr"],
    ownerTeam: "Migration Team",
    updatedAt: "2026-03-30"
  },
  {
    id: "src_acme_archived_policy",
    title: "Archived Migration Policy",
    workspaceId: "acme",
    visibility: "workspace",
    status: "archived",
    region: "global",
    classification: "standard",
    requiredGroups: ["hr"],
    ownerTeam: "Platform",
    updatedAt: "2025-12-10"
  }
];

export const evidenceChunks: EvidenceChunk[] = [
  {
    id: "ev_acme_support_rotation",
    sourceId: "src_acme_onboarding",
    excerpt: "Shadow the support rotation before taking production on-call responsibilities.",
    status: "verified",
    updatedAt: "2026-04-14",
    validFrom: "2026-01-01"
  },
  {
    id: "ev_acme_internal_comp",
    sourceId: "src_acme_internal_comp",
    excerpt: "Promotion packet review includes manager-only compensation calibration notes.",
    status: "verified",
    updatedAt: "2026-04-18",
    validFrom: "2026-01-01"
  },
  {
    id: "ev_acme_support_escalation",
    sourceId: "src_acme_support_handbook",
    excerpt: "Escalate week-one onboarding blockers in the support rotation channel before the Friday review.",
    status: "verified",
    updatedAt: "2026-04-20",
    validFrom: "2026-03-01"
  },
  {
    id: "ev_acme_security_exception",
    sourceId: "src_acme_security_playbook",
    excerpt: "Security exceptions require approval from the incident commander.",
    status: "verified",
    updatedAt: "2026-04-19",
    validFrom: "2026-01-01"
  },
  {
    id: "ev_acme_eu_payroll",
    sourceId: "src_acme_eu_payroll",
    excerpt: "EU payroll setup requires local finance approval before HR onboarding can complete.",
    status: "verified",
    updatedAt: "2026-04-11",
    validFrom: "2026-01-01"
  },
  {
    id: "ev_globex_onboarding",
    sourceId: "src_globex_onboarding",
    excerpt: "Globex migration onboarding content must never appear in Acme answers.",
    status: "verified",
    updatedAt: "2026-03-30",
    validFrom: "2026-01-01"
  },
  {
    id: "ev_acme_archived_policy",
    sourceId: "src_acme_archived_policy",
    excerpt: "The archived migration policy was retired after the platform incident review.",
    status: "verified",
    updatedAt: "2025-12-10",
    validFrom: "2025-01-01"
  },
  {
    id: "ev_acme_stale_checklist",
    sourceId: "src_acme_onboarding",
    excerpt: "Use the legacy VPN checklist before requesting production access.",
    status: "stale",
    updatedAt: "2025-11-08",
    validFrom: "2025-01-01",
    validUntil: "2025-12-31"
  },
  {
    id: "ev_acme_embargoed_benefits",
    sourceId: "src_acme_onboarding",
    excerpt: "New benefits wording launches after the May legal review.",
    status: "verified",
    updatedAt: "2026-04-25",
    validFrom: "2026-05-15"
  },
  {
    id: "ev_acme_redacted_access",
    sourceId: "src_acme_onboarding",
    excerpt:
      "Request temporary root token access only after the engineering lead confirms production readiness.",
    status: "verified",
    updatedAt: "2026-04-14",
    validFrom: "2026-01-01",
    redactions: [
      {
        text: "temporary root token",
        replacement: "[redacted credential]",
        visibleToGroups: ["security"]
      }
    ]
  },
  {
    id: "ev_acme_access_checklist",
    sourceId: "src_acme_onboarding",
    excerpt: "Complete the production access checklist with an engineering lead during week one.",
    status: "verified",
    updatedAt: "2026-04-14",
    validFrom: "2026-01-01"
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
      asOf: "2026-05-01",
      body:
        "New senior engineers should shadow the support rotation {{ev_acme_support_rotation}}, escalate blockers early {{ev_acme_support_escalation}}, request access carefully {{ev_acme_redacted_access}}, and avoid outdated policy {{ev_acme_archived_policy}}.",
      evidence: [
        { evidenceId: "ev_acme_support_rotation", confidence: "high" },
        { evidenceId: "ev_acme_internal_comp", confidence: "medium" },
        { evidenceId: "ev_acme_support_escalation", confidence: "medium" },
        { evidenceId: "ev_acme_security_exception", confidence: "low" },
        { evidenceId: "ev_acme_eu_payroll", confidence: "medium" },
        { evidenceId: "ev_globex_onboarding", confidence: "high" },
        { evidenceId: "ev_acme_archived_policy", confidence: "medium" },
        { evidenceId: "ev_deleted_policy", confidence: "low" },
        { evidenceId: "ev_acme_stale_checklist", confidence: "low" },
        { evidenceId: "ev_acme_embargoed_benefits", confidence: "low" },
        { evidenceId: "ev_acme_redacted_access", confidence: "high" },
        { evidenceId: "ev_acme_access_checklist", confidence: "high" }
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
      asOf: "2026-05-01",
      body:
        "The archived migration policy is no longer available in this workspace {{ev_acme_archived_policy}}. Ask the platform team for the current process {{ev_deleted_policy}}.",
      evidence: [
        { evidenceId: "ev_deleted_policy", confidence: "low" },
        { evidenceId: "ev_acme_archived_policy", confidence: "medium" }
      ]
    }
  },
  {
    id: "conv_no_sources",
    title: "Informal meeting summary",
    workspaceId: "acme",
    question: "What was decided in the informal sync?",
    answer: {
      id: "ans_no_sources",
      asOf: "2026-05-01",
      body: "No durable source was attached to this informal summary.",
      evidence: []
    }
  }
];
