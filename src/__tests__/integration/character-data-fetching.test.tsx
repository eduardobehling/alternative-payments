import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CharacterTable } from "@/components/organisms/CharacterTable";
import type { Character } from "@/types/character";

jest.mock("next/image", () => {
  return function MockImage(props: Record<string, unknown>) {
    return <div data-testid="mock-image" {...props} />;
  };
});

describe("Character Data Integration Tests", () => {
  const mockCharacters: Character[] = [
    {
      id: "1",
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth (C-137)" },
      location: { name: "Citadel of Ricks" },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
    {
      id: "2",
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "unknown" },
      location: { name: "Citadel of Ricks" },
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    },
  ];

  const mockSearchResult: Character[] = [
    {
      id: "1",
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth (C-137)" },
      location: { name: "Citadel of Ricks" },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
  ];

  describe("Data Display Integration", () => {
    it("successfully displays character data through CharacterTable", async () => {
      render(<CharacterTable characters={mockCharacters} totalCount={826} />);

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
      expect(screen.getAllByText("Alive")).toHaveLength(2);
      expect(screen.getAllByText("Human")).toHaveLength(2);
    });

    it("handles empty results correctly", async () => {
      render(
        <CharacterTable
          characters={[]}
          totalCount={0}
          emptyMessage="No characters found"
        />,
      );

      expect(screen.getByText("No characters found")).toBeInTheDocument();
    });

    it("displays loading state", async () => {
      render(<CharacterTable characters={[]} loading={true} />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  describe("Search Functionality Integration", () => {
    it("displays filtered search results", async () => {
      render(
        <CharacterTable
          characters={mockSearchResult}
          searchTerm="Rick"
          totalCount={1}
        />,
      );

      expect(screen.getByDisplayValue("Rick")).toBeInTheDocument();
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.queryByText("Morty Smith")).not.toBeInTheDocument();
    });

    it("handles search with no results", async () => {
      render(
        <CharacterTable
          characters={[]}
          searchTerm="NonexistentCharacter"
          totalCount={0}
          emptyMessage="No characters match your search"
        />,
      );

      expect(
        screen.getByText("No characters match your search"),
      ).toBeInTheDocument();
    });

    it("allows clearing search results", async () => {
      const clearSearchMock = jest.fn();

      render(
        <CharacterTable
          characters={mockCharacters}
          searchTerm="Rick"
          onClearSearch={clearSearchMock}
          totalCount={2}
        />,
      );

      const clearButton = screen.getByLabelText(/clear search/i);
      fireEvent.click(clearButton);

      expect(clearSearchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("View Mode Integration", () => {
    it("switches between table and grid views", async () => {
      render(
        <CharacterTable characters={mockCharacters} defaultViewMode="table" />,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();

      const gridButton = screen.getByLabelText(/grid view/i);
      fireEvent.click(gridButton);

      await waitFor(() => {
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
      });
    });
  });

  describe("Pagination Integration", () => {
    it("displays load more functionality", async () => {
      const mockLoadMore = jest.fn();

      render(
        <CharacterTable
          characters={mockCharacters}
          totalCount={826}
          loadMoreTrigger={
            <button
              type="button"
              onClick={mockLoadMore}
              data-testid="load-more"
            >
              Load More Characters
            </button>
          }
        />,
      );

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
      expect(screen.getByText(/826 characters/i)).toBeInTheDocument();

      // Verify load more trigger works
      expect(screen.getByTestId("load-more")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("load-more"));
      expect(mockLoadMore).toHaveBeenCalledTimes(1);
    });
  });

  describe("Error Handling Integration", () => {
    it("handles component errors gracefully", async () => {
      render(
        <CharacterTable
          characters={[]}
          totalCount={0}
          emptyMessage="Error occurred"
        />,
      );

      expect(screen.getByText("Error occurred")).toBeInTheDocument();
    });
  });

  describe("Complete Data Flow Integration", () => {
    it("integrates all features together", async () => {
      const mockOnSearchChange = jest.fn();
      const mockOnClearSearch = jest.fn();
      const mockLoadMore = jest.fn();

      render(
        <CharacterTable
          characters={mockCharacters}
          searchTerm=""
          onSearchChange={mockOnSearchChange}
          onClearSearch={mockOnClearSearch}
          totalCount={826}
          loading={false}
          loadingMore={false}
          defaultViewMode="table"
          searchPlaceholder="Search characters..."
          emptyMessage="No characters found"
          emptyHint="Try a different search term"
          loadMoreTrigger={
            <button
              type="button"
              onClick={mockLoadMore}
              data-testid="load-more"
            >
              Load More
            </button>
          }
        />,
      );

      // Verify all components are rendered
      expect(
        screen.getByPlaceholderText("Search characters..."),
      ).toBeInTheDocument();
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText(/826 characters/i)).toBeInTheDocument();
      expect(screen.getByTestId("load-more")).toBeInTheDocument();
      expect(screen.getByRole("table")).toBeInTheDocument();

      // Test search interaction
      const searchInput = screen.getByPlaceholderText("Search characters...");
      fireEvent.change(searchInput, { target: { value: "Rick" } });
      expect(mockOnSearchChange).toHaveBeenCalledWith("Rick");

      // Test load more interaction
      fireEvent.click(screen.getByTestId("load-more"));
      expect(mockLoadMore).toHaveBeenCalledTimes(1);
    });

    it("handles data state changes", async () => {
      const { rerender } = render(
        <CharacterTable characters={[]} loading={true} />,
      );

      // Initially loading
      expect(screen.getByText(/loading/i)).toBeInTheDocument();

      // Data loaded
      rerender(
        <CharacterTable
          characters={mockCharacters}
          loading={false}
          totalCount={2}
        />,
      );

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    it("handles search state transitions", async () => {
      const { rerender } = render(
        <CharacterTable
          characters={mockCharacters}
          searchTerm=""
          totalCount={2}
        />,
      );

      // Initial state
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();

      // Search applied
      rerender(
        <CharacterTable
          characters={mockSearchResult}
          searchTerm="Rick"
          totalCount={1}
        />,
      );

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.queryByText("Morty Smith")).not.toBeInTheDocument();
      expect(screen.getByDisplayValue("Rick")).toBeInTheDocument();
    });
  });
});
