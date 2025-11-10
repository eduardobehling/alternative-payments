import type { SpinnerSize } from "@/types/components";
import styles from "./Spinner.module.css";

export interface SpinnerProps {
  size?: SpinnerSize;
}

export function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div className={`${styles.spinner} ${styles[size]}`}>
      <div className={styles.circle}></div>
    </div>
  );
}
