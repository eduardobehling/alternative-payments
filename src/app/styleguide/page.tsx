"use client";

import { BackButton } from "@/components/atoms/BackButton";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { CharacterGridView } from "@/components/organisms/CharacterGridView";
import { CharacterListView } from "@/components/organisms/CharacterListView";
import type { Character } from "@/types/character";

const sampleCharacters: Character[] = [
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
  {
    id: "3",
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: { name: "Earth (Replacement Dimension)" },
    location: { name: "Earth (Replacement Dimension)" },
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
];

export default function StyleguidePage() {
  return (
    <main>
      <div>
        <BackButton />

        <header>
          <Heading>Styleguide</Heading>
          <p>
            A comprehensive showcase of design components and UI patterns used
            throughout the application.
          </p>
        </header>

        <section>
          <Heading level="h2">Back Button</Heading>
          <BackButton />
          <BackButton href="/" label="Custom" />
        </section>

        <section>
          <Heading level="h2">Button Variants</Heading>
          <Button variant="primary" size="xl">
            Extra Large
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="sm">
            Secondary
          </Button>
          <Button variant="primary" size="sm" disabled>
            Disabled
          </Button>
        </section>

        <section>
          <div>
            <Heading level="h2">List View</Heading>
            <CharacterListView characters={sampleCharacters} />
          </div>
          <div>
            <Heading level="h2">Grid View</Heading>
            <CharacterGridView characters={sampleCharacters} />
          </div>
        </section>
      </div>
    </main>
  );
}
