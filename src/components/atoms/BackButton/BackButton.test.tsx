import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BackButton } from "./BackButton";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

describe("BackButton", () => {
  it("renders with default props", () => {
    render(<BackButton />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("← Back to Home");
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveClass("backButton");
  });

  it("renders with custom href", () => {
    render(<BackButton href="/dashboard" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/dashboard");
    expect(link).toHaveTextContent("← Back to Home");
  });

  it("renders with custom label", () => {
    render(<BackButton label="← Back to Dashboard" />);

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("← Back to Dashboard");
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders with custom href and label", () => {
    render(<BackButton href="/characters" label="← Back to Characters" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/characters");
    expect(link).toHaveTextContent("← Back to Characters");
  });

  it("has correct accessibility properties", () => {
    render(<BackButton href="/home" label="← Back to Home Page" />);

    const link = screen.getByRole("link", { name: /back to home page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/home");
  });

  it("applies CSS class correctly", () => {
    render(<BackButton />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("backButton");
  });

  it("renders with special characters in href", () => {
    render(<BackButton href="/search?query=test&filter=active" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/search?query=test&filter=active");
  });
});
