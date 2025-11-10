import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  AlertIcon,
  ChartIcon,
  CloseIcon,
  GridIcon,
  PaletteIcon,
  TableIcon,
  UsersIcon,
} from "./Icon";

describe("Icon Components", () => {
  describe("AlertIcon", () => {
    it("renders with default props", () => {
      render(<AlertIcon />);

      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
      expect(screen.getByTitle("Warning")).toBeInTheDocument();
    });

    it("renders with custom size", () => {
      render(<AlertIcon size={32} />);

      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
    });

    it("renders with custom title", () => {
      render(<AlertIcon title="Custom Alert" />);

      expect(screen.getByTitle("Custom Alert")).toBeInTheDocument();
    });

    it("accepts additional SVG props", () => {
      render(<AlertIcon className="custom-class" data-testid="alert-icon" />);

      const icon = screen.getByTestId("alert-icon");
      expect(icon).toHaveClass("custom-class");
    });

    it("has correct accessibility attributes", () => {
      render(<AlertIcon aria-label="Alert notification" />);

      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("aria-label", "Alert notification");
    });
  });

  describe("ChartIcon", () => {
    it("renders with default props", () => {
      render(<ChartIcon />);

      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
      expect(screen.getByTitle("Chart")).toBeInTheDocument();
    });

    it("renders with custom size", () => {
      render(<ChartIcon size={16} />);

      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "16");
      expect(icon).toHaveAttribute("height", "16");
    });

    it("renders with custom title", () => {
      render(<ChartIcon title="Data Chart" />);

      expect(screen.getByTitle("Data Chart")).toBeInTheDocument();
    });

    it("accepts additional SVG props", () => {
      render(<ChartIcon stroke="red" data-testid="chart-icon" />);

      const icon = screen.getByTestId("chart-icon");
      expect(icon).toHaveAttribute("stroke", "red");
    });
  });

  describe("CloseIcon", () => {
    it("renders with default props", () => {
      render(<CloseIcon />);

      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
      expect(screen.getByTitle("Close")).toBeInTheDocument();
    });

    it("renders with custom title", () => {
      render(<CloseIcon title="Dismiss" />);

      expect(screen.getByTitle("Dismiss")).toBeInTheDocument();
    });

    it("accepts click handlers", () => {
      const handleClick = jest.fn();
      render(<CloseIcon onClick={handleClick} data-testid="close-icon" />);

      const icon = screen.getByTestId("close-icon");
      icon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("GridIcon", () => {
    it("renders with default props", () => {
      render(<GridIcon />);

      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
      expect(screen.getByTitle("Grid view")).toBeInTheDocument();
    });

    it("renders with custom size", () => {
      render(<GridIcon size={20} />);

      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "20");
      expect(icon).toHaveAttribute("height", "20");
    });

    it("renders with custom title", () => {
      render(<GridIcon title="Grid Layout" />);

      expect(screen.getByTitle("Grid Layout")).toBeInTheDocument();
    });
  });

  describe("PaletteIcon", () => {
    it("renders with default props", () => {
      render(<PaletteIcon />);

      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
      expect(screen.getByTitle("Palette")).toBeInTheDocument();
    });

    it("renders with custom title", () => {
      render(<PaletteIcon title="Color Palette" />);

      expect(screen.getByTitle("Color Palette")).toBeInTheDocument();
    });

    it("accepts additional props", () => {
      render(<PaletteIcon fill="blue" data-testid="palette-icon" />);

      const icon = screen.getByTestId("palette-icon");
      expect(icon).toHaveAttribute("fill", "blue");
    });
  });

  describe("TableIcon", () => {
    it("renders with default props", () => {
      render(<TableIcon />);

      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
      expect(screen.getByTitle("Table view")).toBeInTheDocument();
    });

    it("renders with custom size", () => {
      render(<TableIcon size={28} />);

      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "28");
      expect(icon).toHaveAttribute("height", "28");
    });

    it("renders with custom title", () => {
      render(<TableIcon title="Data Table" />);

      expect(screen.getByTitle("Data Table")).toBeInTheDocument();
    });
  });

  describe("UsersIcon", () => {
    it("renders with default props", () => {
      render(<UsersIcon />);

      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
      expect(screen.getByTitle("Users")).toBeInTheDocument();
    });

    it("renders with custom size and title", () => {
      render(<UsersIcon size={18} title="Team Members" />);

      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "18");
      expect(icon).toHaveAttribute("height", "18");
      expect(screen.getByTitle("Team Members")).toBeInTheDocument();
    });

    it("accepts additional SVG props", () => {
      render(<UsersIcon stroke="blue" data-testid="users-icon" />);

      const icon = screen.getByTestId("users-icon");
      expect(icon).toHaveAttribute("stroke", "blue");
    });

    it("supports accessibility attributes", () => {
      render(<UsersIcon title="User Management" aria-label="Manage users" />);

      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("aria-label", "Manage users");
      expect(screen.getByTitle("User Management")).toBeInTheDocument();
    });
  });

  describe("All Icons", () => {
    it("have consistent default structure", () => {
      const icons = [
        AlertIcon,
        ChartIcon,
        CloseIcon,
        GridIcon,
        PaletteIcon,
        TableIcon,
        UsersIcon,
      ];

      icons.forEach((IconComponent, index) => {
        const { unmount } = render(
          <IconComponent data-testid={`icon-${index}`} />,
        );

        const icon = screen.getByTestId(`icon-${index}`);
        expect(icon).toHaveAttribute("role", "img");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
        expect(icon).toHaveAttribute("fill", "none");
        expect(icon).toHaveAttribute("stroke", "currentColor");
        expect(icon).toHaveAttribute("stroke-width", "2");

        unmount();
      });
    });

    it("support custom styling props", () => {
      render(<AlertIcon style={{ color: "red" }} data-testid="styled-icon" />);

      const icon = screen.getByTestId("styled-icon");
      expect(icon).toHaveStyle("color: rgb(255, 0, 0)");
    });
  });

  describe("IconProps interface", () => {
    it("extends SVGProps correctly", () => {
      render(
        <UsersIcon
          id="user-icon"
          className="icon-class"
          style={{ margin: "10px" }}
          onClick={() => {}}
          onMouseOver={() => {}}
          onFocus={() => {}}
          data-testid="full-props-icon"
        />,
      );

      const icon = screen.getByTestId("full-props-icon");
      expect(icon).toHaveAttribute("id", "user-icon");
      expect(icon).toHaveClass("icon-class");
      expect(icon).toHaveStyle("margin: 10px");
    });

    it("handles edge case with size 0", () => {
      render(<ChartIcon size={0} data-testid="zero-size" />);

      const icon = screen.getByTestId("zero-size");
      expect(icon).toHaveAttribute("width", "0");
      expect(icon).toHaveAttribute("height", "0");
    });

    it("handles large size values", () => {
      render(<GridIcon size={1000} data-testid="large-size" />);

      const icon = screen.getByTestId("large-size");
      expect(icon).toHaveAttribute("width", "1000");
      expect(icon).toHaveAttribute("height", "1000");
    });
  });
});
