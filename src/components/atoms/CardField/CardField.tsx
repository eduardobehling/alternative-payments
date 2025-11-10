import type { ReactNode } from "react";
import styles from "./CardField.module.css";

export interface CardFieldProps {
  label: string;
  children: ReactNode;
}

export function CardField({ label, children }: CardFieldProps) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{children}</span>
    </div>
  );
}
