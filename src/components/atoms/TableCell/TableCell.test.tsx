import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TableCell } from "./TableCell";

describe("TableCell", () => {
  it("renders as td by default", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Regular Cell</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByRole("cell");
    expect(cell).toBeInTheDocument();
    expect(cell.tagName).toBe("TD");
    expect(cell).toHaveTextContent("Regular Cell");
  });

  it("renders as th when header is true", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableCell header>Header Cell</TableCell>
          </tr>
        </thead>
      </table>,
    );

    const cell = screen.getByRole("columnheader");
    expect(cell).toBeInTheDocument();
    expect(cell.tagName).toBe("TH");
    expect(cell).toHaveTextContent("Header Cell");
  });

  it("applies correct CSS classes for regular cell", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Content</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByRole("cell");
    expect(cell).toHaveClass("cell");
    expect(cell).not.toHaveClass("header");
  });

  it("applies correct CSS classes for header cell", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableCell header>Header</TableCell>
          </tr>
        </thead>
      </table>,
    );

    const cell = screen.getByRole("columnheader");
    expect(cell).toHaveClass("cell", "header");
  });

  it("applies custom className", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell className="custom-cell">Custom</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByRole("cell");
    expect(cell).toHaveClass("cell", "custom-cell");
  });

  it("passes through HTML attributes for td", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell
              id="test-cell"
              rowSpan={2}
              colSpan={3}
              data-testid="table-cell"
            >
              Cell with attributes
            </TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByRole("cell");
    expect(cell).toHaveAttribute("id", "test-cell");
    expect(cell).toHaveAttribute("rowspan", "2");
    expect(cell).toHaveAttribute("colspan", "3");
    expect(cell).toHaveAttribute("data-testid", "table-cell");
  });

  it("passes through HTML attributes for th", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableCell
              header
              scope="col"
              id="header-cell"
              data-testid="header-cell"
            >
              Header with attributes
            </TableCell>
          </tr>
        </thead>
      </table>,
    );

    const cell = screen.getByRole("columnheader");
    expect(cell).toHaveAttribute("scope", "col");
    expect(cell).toHaveAttribute("id", "header-cell");
    expect(cell).toHaveAttribute("data-testid", "header-cell");
  });

  it("renders complex children", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>
              <div>
                <strong>Bold text</strong>
                <span> and normal text</span>
              </div>
            </TableCell>
          </tr>
        </tbody>
      </table>,
    );

    expect(screen.getByText("Bold text")).toBeInTheDocument();
    expect(screen.getByText(" and normal text")).toBeInTheDocument();
  });

  it("handles empty children", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>{null}</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByRole("cell");
    expect(cell).toBeInTheDocument();
    expect(cell).toBeEmptyDOMElement();
  });

  it("handles numeric children", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>{42}</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByRole("cell");
    expect(cell).toHaveTextContent("42");
  });
});
