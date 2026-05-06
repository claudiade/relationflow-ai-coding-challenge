import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { CitationList } from "@/components/citation-list";
import { conversations, sources, viewer } from "@/data/fixtures";

describe("CitationList", () => {
  it("shows linked sources for an answer", () => {
    render(<CitationList answer={conversations[0].answer} sources={sources} viewer={viewer} />);

    expect(screen.getByText("Acme Onboarding Playbook")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-citations")).not.toBeInTheDocument();
  });

  it("does not crash when an answer references a deleted source", () => {
    render(<CitationList answer={conversations[1].answer} sources={sources} viewer={viewer} />);

    expect(screen.getByTestId("empty-citations")).toHaveTextContent("No sources available");
  });

  it("shows the empty state when no sources are attached", () => {
    render(<CitationList answer={conversations[2].answer} sources={sources} viewer={viewer} />);

    expect(screen.getByTestId("empty-citations")).toHaveTextContent("No sources available");
  });
});
