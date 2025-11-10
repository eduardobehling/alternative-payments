import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CardField } from "./CardField";

describe("CardField", () => {
  it("renders label and children correctly", () => {
    render(<CardField label="Name">John Doe</CardField>);

    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<CardField label="Status">Active</CardField>);

    const field = container.firstChild as HTMLElement;
    const label = container.querySelector(".label");
    const value = container.querySelector(".value");

    expect(field).toHaveClass("field");
    expect(label).toHaveClass("label");
    expect(value).toHaveClass("value");
  });

  it("renders complex children", () => {
    render(
      <CardField label="Description">
        <div>
          <strong>Important:</strong> <em>This is a complex description</em>
        </div>
      </CardField>,
    );

    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByText("Important:")).toBeInTheDocument();
    expect(
      screen.getByText("This is a complex description"),
    ).toBeInTheDocument();
  });

  it("handles empty children", () => {
    render(<CardField label="Empty">{null}</CardField>);

    expect(screen.getByText("Empty:")).toBeInTheDocument();

    const value = screen.getByText("Empty:").nextSibling;
    expect(value).toBeInTheDocument();
  });

  it("handles long labels", () => {
    const longLabel =
      "This is a very long label that might wrap to multiple lines";
    render(<CardField label={longLabel}>Some value</CardField>);

    expect(screen.getByText(`${longLabel}:`)).toBeInTheDocument();
    expect(screen.getByText("Some value")).toBeInTheDocument();
  });

  it("handles special characters in label", () => {
    render(<CardField label="Email & Phone">contact@example.com</CardField>);

    expect(screen.getByText("Email & Phone:")).toBeInTheDocument();
    expect(screen.getByText("contact@example.com")).toBeInTheDocument();
  });

  it("renders multiple CardField components correctly", () => {
    render(
      <div>
        <CardField label="First Name">John</CardField>
        <CardField label="Last Name">Doe</CardField>
        <CardField label="Age">30</CardField>
      </div>,
    );

    expect(screen.getByText("First Name:")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Last Name:")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Age:")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("handles numeric children", () => {
    render(<CardField label="Price">{29.99}</CardField>);

    expect(screen.getByText("Price:")).toBeInTheDocument();
    expect(screen.getByText("29.99")).toBeInTheDocument();
  });
});
