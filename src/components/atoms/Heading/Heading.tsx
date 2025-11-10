import type { HTMLAttributes } from "react";
import type { HeadingLevel } from "@/types/components";
import styles from "./Heading.module.css";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  children: React.ReactNode;
}

export function Heading({
  level = "h1",
  children,
  className,
  ...props
}: HeadingProps) {
  const Tag = level;

  return (
    <Tag
      className={`${styles.heading} ${styles[level]} ${className || ""}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
