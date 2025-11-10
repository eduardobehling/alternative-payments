import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("input");
  });

  it("applies custom className", () => {
    render(<Input className="custom-input" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("input", "custom-input");
  });

  it("handles value changes", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "test value",
        }),
      }),
    );
  });

  it("handles disabled state", () => {
    render(<Input disabled />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text here" />);

    const input = screen.getByPlaceholderText("Enter text here");
    expect(input).toBeInTheDocument();
  });

  it("handles different input types", () => {
    const { rerender } = render(<Input type="text" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");

    rerender(<Input type="password" />);
    const passwordInput = screen.getByRole("textbox");
    expect(passwordInput).toHaveAttribute("type", "password");

    rerender(<Input type="email" />);
    const emailInput = screen.getByRole("textbox");
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("passes through HTML attributes", () => {
    render(
      <Input
        id="test-input"
        name="testName"
        required
        aria-label="Test input"
        data-testid="custom-input"
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "test-input");
    expect(input).toHaveAttribute("name", "testName");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-label", "Test input");
    expect(input).toHaveAttribute("data-testid", "custom-input");
  });
});
