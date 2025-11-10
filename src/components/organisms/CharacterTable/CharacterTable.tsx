import Image from "next/image";
import { TableCell } from "@/components/atoms/TableCell";
import { TableRow } from "@/components/atoms/TableRow";
import type { Character } from "@/types/character";
import styles from "./CharacterTable.module.css";

export interface CharacterTableProps {
  characters: Character[];
}

export function CharacterTable({ characters }: CharacterTableProps) {
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
                />
              </TableCell>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.status}</TableCell>
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
