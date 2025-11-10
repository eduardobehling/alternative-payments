import { Button } from "@/components/atoms/Button";
import { SearchInput } from "@/components/molecules/SearchInput";
import { CharacterTable } from "@/components/organisms/CharacterTable";
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

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Header info</h1>
        </header>

        <section className={styles.section}>
          <div>
            <SearchInput />
          </div>
          <div>
            <Button>Search</Button>
          </div>
          <div>
            <CharacterTable characters={sampleCharacters} />
          </div>
        </section>

        <footer className={styles.footer}>
          <p className={styles.footerText}>Footer Info</p>
        </footer>
      </div>
    </main>
  );
}
