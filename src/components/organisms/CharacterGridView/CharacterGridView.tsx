import Image from "next/image";
import { CardField } from "@/components/atoms/CardField";
import { Card } from "@/components/molecules/Card";
import { CardGrid } from "@/components/organisms/CardGrid";
import type { Character } from "@/types/character";
import styles from "./CharacterGridView.module.css";

export interface CharacterGridViewProps {
  characters: Character[];
}

export function CharacterGridView({ characters }: CharacterGridViewProps) {
  return (
    <CardGrid>
      {characters.map((character) => (
        <Card key={character.id}>
          <div className={styles.cardContent}>
            <Image
              src={character.image}
              alt={character.name}
              width={150}
              height={150}
              className={styles.cardImage}
            />
            <CardField label="Name">{character.name}</CardField>
            <CardField label="Status">
              <span
                className={`${styles.status} ${styles[character.status.toLowerCase()]}`}
              >
                {character.status}
              </span>
            </CardField>
            <CardField label="Species">{character.species}</CardField>
            <CardField label="Gender">{character.gender}</CardField>
            <CardField label="Origin">{character.origin.name}</CardField>
            <CardField label="Location">{character.location.name}</CardField>
          </div>
        </Card>
      ))}
    </CardGrid>
  );
}
