import type { ReactNode, TdHTMLAttributes } from "react";
import styles from "./TableCell.module.css";

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  header?: boolean;
}

export function TableCell({
  children,
  header = false,
  className = "",
  ...props
}: TableCellProps) {
  const Component = header ? "th" : "td";

  return (
    <Component
      className={`${styles.cell} ${header ? styles.header : ""} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
