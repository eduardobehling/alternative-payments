import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PageHead } from "./PageHead";

interface MockElement {
  type: string;
  props: Record<string, string>;
}

const mockHead = jest.fn();
jest.mock("next/head", () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    mockHead(children);
    return <div data-testid="mock-head">{children}</div>;
  };
});

describe("PageHead", () => {
  const defaultProps = {
    title: "Test Page Title",
    description: "Test page description for SEO",
    keywords: "test, page, seo, keywords",
    canonicalUrl: "/test-page",
  };

  beforeEach(() => {
    mockHead.mockClear();
  });

  it("renders with required props", () => {
    const { container } = render(<PageHead {...defaultProps} />);

    const head = container.querySelector('[data-testid="mock-head"]');
    expect(head).toBeInTheDocument();
  });

  it("renders without errors", () => {
    expect(() => render(<PageHead {...defaultProps} />)).not.toThrow();
  });

  it("calls Head component with children", () => {
    render(<PageHead {...defaultProps} />);

    expect(mockHead).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.any(Object), // title
        expect.any(Object), // meta description
        expect.any(Object), // meta keywords
        expect.any(Object), // meta viewport
        expect.any(Object), // og:title
        expect.any(Object), // og:description
        expect.any(Object), // og:type
        expect.any(Object), // canonical link
      ]),
    );
  });

  it("renders title element", () => {
    render(<PageHead {...defaultProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];
    const titleElement = children.find(
      (child: MockElement) => child.type === "title",
    );

    expect(titleElement).toBeDefined();
    expect(titleElement?.props.children).toBe("Test Page Title");
  });

  it("renders meta description", () => {
    render(<PageHead {...defaultProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];
    const metaDescription = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.name === "description",
    );

    expect(metaDescription).toBeDefined();
    expect(metaDescription?.props.content).toBe(
      "Test page description for SEO",
    );
  });

  it("renders meta keywords", () => {
    render(<PageHead {...defaultProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];
    const metaKeywords = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.name === "keywords",
    );

    expect(metaKeywords).toBeDefined();
    expect(metaKeywords?.props.content).toBe("test, page, seo, keywords");
  });

  it("renders viewport meta tag", () => {
    render(<PageHead {...defaultProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];
    const viewport = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.name === "viewport",
    );

    expect(viewport).toBeDefined();
    expect(viewport?.props.content).toBe("width=device-width, initial-scale=1");
  });

  it("renders canonical link", () => {
    render(<PageHead {...defaultProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];
    const canonical = children.find(
      (child: MockElement) =>
        child.type === "link" && child.props.rel === "canonical",
    );

    expect(canonical).toBeDefined();
    expect(canonical?.props.href).toBe("/test-page");
  });

  it("renders default Open Graph tags", () => {
    render(<PageHead {...defaultProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];
    const ogTitle = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.property === "og:title",
    );
    const ogDescription = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.property === "og:description",
    );
    const ogType = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.property === "og:type",
    );

    expect(ogTitle?.props.content).toBe("Test Page Title");
    expect(ogDescription?.props.content).toBe("Test page description for SEO");
    expect(ogType?.props.content).toBe("website");
  });

  it("renders custom Open Graph title and description", () => {
    const customProps = {
      ...defaultProps,
      ogTitle: "Custom OG Title",
      ogDescription: "Custom OG Description",
    };

    render(<PageHead {...customProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];
    const ogTitle = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.property === "og:title",
    );
    const ogDescription = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.property === "og:description",
    );

    expect(ogTitle?.props.content).toBe("Custom OG Title");
    expect(ogDescription?.props.content).toBe("Custom OG Description");
  });

  it("renders custom Open Graph type", () => {
    const customProps = {
      ...defaultProps,
      ogType: "article",
    };

    render(<PageHead {...customProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];
    const ogType = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.property === "og:type",
    );

    expect(ogType?.props.content).toBe("article");
  });

  it("handles long title and description", () => {
    const longProps = {
      title: "Very Long Title That Should Still Work Correctly",
      description:
        "Very long description that should still work correctly and not cause any issues with the component",
      keywords:
        "long, title, description, seo, optimization, detailed, information",
      canonicalUrl: "/very-long-page-url-with-many-segments/and-parameters",
    };

    render(<PageHead {...longProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];
    const titleElement = children.find(
      (child: MockElement) => child.type === "title",
    );
    const metaDescription = children.find(
      (child: MockElement) =>
        child.type === "meta" && child.props.name === "description",
    );

    expect(titleElement?.props.children).toBe(longProps.title);
    expect(metaDescription?.props.content).toBe(longProps.description);
  });

  it("renders all required elements", () => {
    render(<PageHead {...defaultProps} />);

    const children = mockHead.mock.calls[0][0] as MockElement[];

    expect(
      children.find((child: MockElement) => child.type === "title"),
    ).toBeDefined();
    expect(
      children.find(
        (child: MockElement) =>
          child.type === "meta" && child.props.name === "description",
      ),
    ).toBeDefined();
    expect(
      children.find(
        (child: MockElement) =>
          child.type === "meta" && child.props.name === "keywords",
      ),
    ).toBeDefined();
    expect(
      children.find(
        (child: MockElement) =>
          child.type === "meta" && child.props.name === "viewport",
      ),
    ).toBeDefined();
    expect(
      children.find(
        (child: MockElement) =>
          child.type === "meta" && child.props.property === "og:title",
      ),
    ).toBeDefined();
    expect(
      children.find(
        (child: MockElement) =>
          child.type === "meta" && child.props.property === "og:description",
      ),
    ).toBeDefined();
    expect(
      children.find(
        (child: MockElement) =>
          child.type === "meta" && child.props.property === "og:type",
      ),
    ).toBeDefined();
    expect(
      children.find(
        (child: MockElement) =>
          child.type === "link" && child.props.rel === "canonical",
      ),
    ).toBeDefined();
  });
});
