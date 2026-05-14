import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { AnswerContent } from "@/components/answer-content";
import { CitationList } from "@/components/citation-list";
import { conversations, evidenceChunks, sources, viewer } from "@/data/fixtures";
import { canViewSource, resolveCitations } from "@/lib/citations";

const onboardingAnswer = conversations[0].answer;

function resolveOnboarding() {
  return resolveCitations(onboardingAnswer, evidenceChunks, sources, viewer);
}

describe("canViewSource", () => {
  it("returns true when the source is active, in the viewer's workspace, and the viewer has the required groups", () => {
    expect(canViewSource(sources[0], viewer)).toBe(true);
  });

  it("returns false when the source belongs to a different workspace", () => {
    expect(canViewSource(sources[5], viewer)).toBe(false);
  });

  it("returns false when the source is archived", () => {
    expect(canViewSource(sources[6], viewer)).toBe(false);
  });

  it("returns false when the source is internal and the viewer is not an internal employee with admin role", () => {
    expect(canViewSource(sources[2], viewer)).toBe(false);
  });

  it("returns false when the source region does not match the viewer's region", () => {
    const euSource = { ...sources[0], region: "eu" as const };
    expect(canViewSource(euSource, viewer)).toBe(false);
  });

  it("returns false when the viewer is missing a required group", () => {
    expect(canViewSource(sources[3], viewer)).toBe(false);
  });
});

describe("evidence-backed citations", () => {
  it("groups visible evidence by source and preserves first-visible source order", () => {
    const resolution = resolveOnboarding();

    expect(resolution.citations.map((citation) => citation.sourceId)).toEqual([
      "src_acme_onboarding",
      "src_acme_support_handbook"
    ]);
    expect(resolution.citations[0].evidence.map((evidence) => evidence.id)).toEqual([
      "ev_acme_support_rotation",
      "ev_acme_redacted_access",
      "ev_acme_access_checklist"
    ]);
    expect(resolution.citations[1].evidence.map((evidence) => evidence.id)).toEqual([
      "ev_acme_support_escalation"
    ]);
  });

  it("renders grouped citation cards with source metadata and unavailable count", () => {
    render(<CitationList resolution={resolveOnboarding()} />);

    const cards = screen.getAllByTestId("citation-card");

    expect(cards).toHaveLength(2);
    expect(within(cards[0]).getByText("[1] Acme Onboarding Playbook")).toBeInTheDocument();
    expect(within(cards[1]).getByText("[2] Acme Support Rotation Handbook")).toBeInTheDocument();
    expect(screen.getByTestId("unavailable-citations")).toHaveTextContent("8 sources unavailable");
  });

  it("redacts restricted terms inside otherwise visible evidence", () => {
    render(<CitationList resolution={resolveOnboarding()} />);

    const firstCard = screen.getAllByTestId("citation-card")[0];

    expect(within(firstCard).getByText(/Request \[redacted credential\] access/)).toBeInTheDocument();
    expect(screen.queryByText(/temporary root token/)).not.toBeInTheDocument();
  });

  it("adds inline citation markers only for visible evidence and removes unavailable markers", () => {
    render(<AnswerContent answer={onboardingAnswer} resolution={resolveOnboarding()} />);

    expect(screen.getAllByLabelText("Citation 1")).toHaveLength(2);
    expect(screen.getByLabelText("Citation 2")).toHaveTextContent("[2]");
    expect(screen.queryByText(/ev_acme_archived_policy/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\{\{/)).not.toBeInTheDocument();
  });

  it("shows a non-leaking empty state when every evidence reference is unavailable", () => {
    const resolution = resolveCitations(conversations[1].answer, evidenceChunks, sources, viewer);

    render(<CitationList resolution={resolution} />);

    expect(screen.getByTestId("empty-citations")).toHaveTextContent("No sources available");
    expect(screen.getByTestId("unavailable-citations")).toHaveTextContent("2 sources unavailable");
    expect(screen.queryByText("Archived Migration Policy")).not.toBeInTheDocument();
  });

  it("shows no unavailable summary when no evidence is attached", () => {
    const resolution = resolveCitations(conversations[2].answer, evidenceChunks, sources, viewer);

    render(<CitationList resolution={resolution} />);

    expect(screen.getByTestId("empty-citations")).toHaveTextContent("No sources available");
    expect(screen.queryByTestId("unavailable-citations")).not.toBeInTheDocument();
  });
});
