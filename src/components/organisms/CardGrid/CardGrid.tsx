import type { ReactNode } from "react";
import styles from "./CardGrid.module.css";

export interface CardGridProps {
  children: ReactNode;
  className?: string;
}

export function CardGrid({ children, className = "" }: CardGridProps) {
  return <div className={`${styles.grid} ${className}`}>{children}</div>;
}
