import { render } from "@testing-library/react";
import type { Character } from "@/types/character";
import { CharacterTable } from "./CharacterTable";

jest.mock("@/components/atoms/Spinner", () => {
  return {
    Spinner: ({ size }: { size?: string }) => (
      <div data-testid="spinner" data-size={size}>
        Loading...
      </div>
    ),
  };
});

jest.mock("@/components/molecules/SearchInput", () => {
  return {
    SearchInput: (props: {
      placeholder?: string;
      value?: string;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onClear?: () => void;
    }) => (
      <input
        data-testid="search-input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    ),
  };
});

jest.mock("@/components/molecules/ViewMode", () => {
  return {
    ViewMode: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (mode: string) => void;
    }) => (
      <div data-testid="view-mode" data-value={value}>
        <button type="button" onClick={() => onChange("table")}>
          Table
        </button>
        <button type="button" onClick={() => onChange("grid")}>
          Grid
        </button>
      </div>
    ),
  };
});

jest.mock("@/components/organisms/CharacterGridView", () => {
  return {
    CharacterGridView: ({ characters }: { characters: Character[] }) => (
      <div data-testid="character-grid-view">
        Grid view with {characters.length} characters
        {characters.map((char) => (
          <div key={char.id}>{char.name}</div>
        ))}
      </div>
    ),
  };
});

jest.mock("@/components/organisms/CharacterListView", () => {
  return {
    CharacterListView: ({ characters }: { characters: Character[] }) => (
      <div data-testid="character-list-view">
        List view with {characters.length} characters
        {characters.map((char) => (
          <div key={char.id}>{char.name}</div>
        ))}
      </div>
    ),
  };
});

describe("CharacterTable Snapshots", () => {
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

  it("renders with default props", () => {
    const { container } = render(
      <CharacterTable characters={mockCharacters} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom defaultViewMode as grid", () => {
    const { container } = render(
      <CharacterTable characters={mockCharacters} defaultViewMode="grid" />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with search term", () => {
    const { container } = render(
      <CharacterTable
        characters={mockCharacters}
        searchTerm="Rick"
        onSearchChange={() => {}}
        onClearSearch={() => {}}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with total count", () => {
    const { container } = render(
      <CharacterTable characters={mockCharacters} totalCount={826} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders loading state", () => {
    const { container } = render(
      <CharacterTable characters={[]} loading={true} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders loading more state", () => {
    const { container } = render(
      <CharacterTable characters={mockCharacters} loadingMore={true} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders empty state with no characters", () => {
    const { container } = render(
      <CharacterTable characters={[]} loading={false} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders empty state with custom messages", () => {
    const { container } = render(
      <CharacterTable
        characters={[]}
        emptyMessage="No characters match your search"
        emptyHint="Try adjusting your search criteria"
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom search placeholder", () => {
    const { container } = render(
      <CharacterTable
        characters={mockCharacters}
        searchPlaceholder="Search by name, species, or location..."
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with load more trigger", () => {
    const loadMoreTrigger = (
      <button type="button" data-testid="load-more">
        Load More Characters
      </button>
    );

    const { container } = render(
      <CharacterTable
        characters={mockCharacters}
        loadMoreTrigger={loadMoreTrigger}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with all props combined", () => {
    const loadMoreTrigger = (
      <div data-testid="infinite-scroll-trigger">Scroll trigger</div>
    );

    const { container } = render(
      <CharacterTable
        characters={mockCharacters}
        defaultViewMode="grid"
        searchTerm="Rick"
        onSearchChange={() => {}}
        onClearSearch={() => {}}
        totalCount={2}
        loading={false}
        loadingMore={false}
        searchPlaceholder="Search characters..."
        emptyMessage="No results found"
        emptyHint="Try a different search term"
        loadMoreTrigger={loadMoreTrigger}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with single character", () => {
    const singleCharacter: Character[] = [
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

    const { container } = render(
      <CharacterTable characters={singleCharacter} totalCount={1} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with many characters", () => {
    const manyCharacters: Character[] = Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Character ${i + 1}`,
      status: i % 3 === 0 ? "Alive" : i % 3 === 1 ? "Dead" : "unknown",
      species: i % 2 === 0 ? "Human" : "Alien",
      type: "",
      gender: i % 3 === 0 ? "Male" : i % 3 === 1 ? "Female" : "Genderless",
      origin: { name: `Origin ${i + 1}` },
      location: { name: `Location ${i + 1}` },
      image: `https://rickandmortyapi.com/api/character/avatar/${i + 1}.jpeg`,
    }));

    const { container } = render(
      <CharacterTable characters={manyCharacters} totalCount={826} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders loading state while characters exist", () => {
    const { container } = render(
      <CharacterTable characters={mockCharacters} loading={true} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with zero total count", () => {
    const { container } = render(
      <CharacterTable characters={[]} totalCount={0} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders without total count prop", () => {
    const { container } = render(
      <CharacterTable characters={mockCharacters} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with complex load more trigger", () => {
    const complexTrigger = (
      <div data-testid="complex-trigger">
        <div>Loading more content...</div>
        <button type="button">Manual Load More</button>
      </div>
    );

    const { container } = render(
      <CharacterTable
        characters={mockCharacters}
        loadMoreTrigger={complexTrigger}
        loadingMore={true}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders controls section correctly", () => {
    const { container } = render(
      <CharacterTable
        characters={mockCharacters}
        searchTerm="test search"
        searchPlaceholder="Custom placeholder"
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders results info with singular character", () => {
    const { container } = render(
      <CharacterTable characters={mockCharacters} totalCount={1} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders results info with multiple characters", () => {
    const { container } = render(
      <CharacterTable characters={mockCharacters} totalCount={42} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
