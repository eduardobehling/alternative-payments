import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PageHead } from "./PageHead";

// Mock Next.js Head component
jest.mock("next/head", () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
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

  it("renders with required props", () => {
    const { container } = render(<PageHead {...defaultProps} />);

    const head = container.querySelector('[data-testid="mock-head"]');
    expect(head).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    const { container } = render(<PageHead {...defaultProps} />);

    const title = container.querySelector("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Test Page Title");
  });

  it("renders meta description", () => {
    const { container } = render(<PageHead {...defaultProps} />);

    const metaDescription = container.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription).toHaveAttribute(
      "content",
      "Test page description for SEO",
    );
  });

  it("renders meta keywords", () => {
    const { container } = render(<PageHead {...defaultProps} />);

    const metaKeywords = container.querySelector('meta[name="keywords"]');
    expect(metaKeywords).toBeInTheDocument();
    expect(metaKeywords).toHaveAttribute(
      "content",
      "test, page, seo, keywords",
    );
  });

  it("renders viewport meta tag", () => {
    const { container } = render(<PageHead {...defaultProps} />);

    const viewport = container.querySelector('meta[name="viewport"]');
    expect(viewport).toBeInTheDocument();
    expect(viewport).toHaveAttribute(
      "content",
      "width=device-width, initial-scale=1",
    );
  });

  it("renders canonical link", () => {
    const { container } = render(<PageHead {...defaultProps} />);

    const canonical = container.querySelector('link[rel="canonical"]');
    expect(canonical).toBeInTheDocument();
    expect(canonical).toHaveAttribute("href", "/test-page");
  });

  it("renders default Open Graph tags", () => {
    const { container } = render(<PageHead {...defaultProps} />);

    const ogTitle = container.querySelector('meta[property="og:title"]');
    const ogDescription = container.querySelector(
      'meta[property="og:description"]',
    );
    const ogType = container.querySelector('meta[property="og:type"]');

    expect(ogTitle).toHaveAttribute("content", "Test Page Title");
    expect(ogDescription).toHaveAttribute(
      "content",
      "Test page description for SEO",
    );
    expect(ogType).toHaveAttribute("content", "website");
  });

  it("renders custom Open Graph title and description", () => {
    const customProps = {
      ...defaultProps,
      ogTitle: "Custom OG Title",
      ogDescription: "Custom OG Description",
    };

    const { container } = render(<PageHead {...customProps} />);

    const ogTitle = container.querySelector('meta[property="og:title"]');
    const ogDescription = container.querySelector(
      'meta[property="og:description"]',
    );

    expect(ogTitle).toHaveAttribute("content", "Custom OG Title");
    expect(ogDescription).toHaveAttribute("content", "Custom OG Description");
  });

  it("renders custom Open Graph type", () => {
    const customProps = {
      ...defaultProps,
      ogType: "article",
    };

    const { container } = render(<PageHead {...customProps} />);

    const ogType = container.querySelector('meta[property="og:type"]');
    expect(ogType).toHaveAttribute("content", "article");
  });

  it("handles long title and description", () => {
    const longProps = {
      title:
        "This is a very long title that might be used for a complex page with lots of information",
      description:
        "This is a very long description that provides detailed information about the page content, its purpose, and what users can expect to find when they visit this page.",
      keywords:
        "long, title, description, seo, optimization, detailed, information",
      canonicalUrl: "/very-long-page-url-with-many-segments/and-parameters",
    };

    const { container } = render(<PageHead {...longProps} />);

    const title = container.querySelector("title");
    const metaDescription = container.querySelector('meta[name="description"]');

    expect(title).toHaveTextContent(longProps.title);
    expect(metaDescription).toHaveAttribute("content", longProps.description);
  });

  it("renders all meta tags with correct structure", () => {
    const { container } = render(<PageHead {...defaultProps} />);

    // Check that all required meta tags are present
    expect(container.querySelector("title")).toBeInTheDocument();
    expect(
      container.querySelector('meta[name="description"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('meta[name="keywords"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('meta[name="viewport"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('meta[property="og:title"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('meta[property="og:description"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('meta[property="og:type"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('link[rel="canonical"]'),
    ).toBeInTheDocument();
  });
});
