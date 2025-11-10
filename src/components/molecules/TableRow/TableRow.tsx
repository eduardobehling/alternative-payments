import type { ReactNode } from "react";
import styles from "./TableRow.module.css";

export interface TableRowProps {
  children: ReactNode;
  header?: boolean;
}

export function TableRow({ children, header = false }: TableRowProps) {
  return (
    <tr className={`${styles.row} ${header ? styles.header : ""}`}>
      {children}
    </tr>
  );
}
