import type { InputHTMLAttributes } from "react";
import { Button } from "@/components/atoms/Button";
import { CloseIcon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import styles from "./SearchInput.module.css";

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  showClearButton?: boolean;
}

export function SearchInput({
  onClear,
  showClearButton = true,
  value,
  ...props
}: SearchInputProps) {
  const hasValue = value && String(value).length > 0;

  return (
    <div className={styles.container}>
      <Input type="search" value={value} {...props} />
      {showClearButton && hasValue && onClear && (
        <Button
          type="button"
          onClick={onClear}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          <CloseIcon size={16} />
        </Button>
      )}
    </div>
  );
}
