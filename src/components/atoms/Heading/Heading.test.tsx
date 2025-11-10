import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders with default h1 level", () => {
    render(<Heading>Default Heading</Heading>);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Default Heading");
    expect(heading.tagName).toBe("H1");
  });

  it("renders with different heading levels", () => {
    const { rerender } = render(<Heading level="h1">Heading 1</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    rerender(<Heading level="h2">Heading 2</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

    rerender(<Heading level="h3">Heading 3</Heading>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

    rerender(<Heading level="h4">Heading 4</Heading>);
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();

    rerender(<Heading level="h5">Heading 5</Heading>);
    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();

    rerender(<Heading level="h6">Heading 6</Heading>);
    expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Heading className="custom-heading">Custom Heading</Heading>);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveClass("heading", "custom-heading");
  });

  it("passes through HTML attributes", () => {
    render(
      <Heading
        level="h3"
        id="test-heading"
        aria-label="Custom heading label"
        data-testid="custom-heading"
      >
        Accessible Heading
      </Heading>,
    );

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveAttribute("id", "test-heading");
    expect(heading).toHaveAttribute("aria-label", "Custom heading label");
    expect(heading).toHaveAttribute("data-testid", "custom-heading");
    expect(heading.tagName).toBe("H3");
  });

  it("renders children correctly", () => {
    render(
      <Heading level="h2">
        <span>Complex</span> <strong>Children</strong>
      </Heading>,
    );

    const heading = screen.getByRole("heading");
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Children")).toBeInTheDocument();
    expect(heading).toContainHTML(
      "<span>Complex</span> <strong>Children</strong>",
    );
  });
});
