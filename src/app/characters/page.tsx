"use client";

import { BackButton } from "@/components/atoms/BackButton";
import { Heading } from "@/components/atoms/Heading";
import { CharacterGridView } from "@/components/organisms/CharacterGridView";
import { CharacterListView } from "@/components/organisms/CharacterListView";
import type { Character } from "@/types/character";
import styles from "./page.module.css";

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

export default function CharactersPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <BackButton />

        <header className={styles.header}>
          <Heading>Rick and Morty Characters</Heading>
          <p className={styles.subtitle}>
            Explore characters from the Rick and Morty universe
          </p>
        </header>

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
