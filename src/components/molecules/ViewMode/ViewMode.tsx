import { Button } from "@/components/atoms/Button";
import { GridIcon, TableIcon } from "@/components/atoms/Icon";
import type { ViewModeType } from "@/types/components";
import styles from "./ViewMode.module.css";

export interface ViewModeProps {
  value: ViewModeType;
  onChange: (mode: ViewModeType) => void;
}

export function ViewMode({ value, onChange }: ViewModeProps) {
  return (
    <div className={styles.viewToggle}>
      <Button
        type="button"
        className={`${styles.viewButton} ${value === "table" ? styles.active : ""}`}
        onClick={() => onChange("table")}
        aria-label="Table view"
      >
        <TableIcon />
      </Button>
      <Button
        type="button"
        className={`${styles.viewButton} ${value === "grid" ? styles.active : ""}`}
        onClick={() => onChange("grid")}
        aria-label="Grid view"
      >
        <GridIcon />
      </Button>
    </div>
  );
}
