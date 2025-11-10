import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with default size", () => {
    const { container } = render(<Spinner />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("spinner", "md");
  });

  it("renders with small size", () => {
    const { container } = render(<Spinner size="sm" />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass("spinner", "sm");
  });

  it("renders with medium size", () => {
    const { container } = render(<Spinner size="md" />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass("spinner", "md");
  });

  it("renders with large size", () => {
    const { container } = render(<Spinner size="lg" />);

    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass("spinner", "lg");
  });

  it("contains a circle element", () => {
    const { container } = render(<Spinner />);

    const circle = container.querySelector(".circle");
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveClass("circle");
  });

  it("renders without any props", () => {
    const { container } = render(<Spinner />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
