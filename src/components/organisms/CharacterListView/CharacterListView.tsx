import Image from "next/image";
import { TableCell } from "@/components/atoms/TableCell";
import { TableRow } from "@/components/molecules/TableRow";
import type { Character } from "@/types/character";
import styles from "./CharacterListView.module.css";

export interface CharacterListViewProps {
  characters: Character[];
}

export function CharacterListView({ characters }: CharacterListViewProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <TableRow header>
            <TableCell header>Image</TableCell>
            <TableCell header>Name</TableCell>
            <TableCell header>Status</TableCell>
            <TableCell header>Species</TableCell>
            <TableCell header>Gender</TableCell>
            <TableCell header>Origin</TableCell>
            <TableCell header>Location</TableCell>
          </TableRow>
        </thead>
        <tbody>
          {characters.map((character) => (
            <TableRow key={character.id}>
              <TableCell>
                <Image
                  src={character.image}
                  alt={character.name}
                  width={50}
                  height={50}
                  className={styles.characterImage}
                />
              </TableCell>
              <TableCell>{character.name}</TableCell>
              <TableCell>
                <span
                  className={`${styles.status} ${styles[character.status.toLowerCase()]}`}
                >
                  {character.status}
                </span>
              </TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.gender}</TableCell>
              <TableCell>{character.origin.name}</TableCell>
              <TableCell>{character.location.name}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
