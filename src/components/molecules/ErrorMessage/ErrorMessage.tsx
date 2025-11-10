import { Heading } from "@/components/atoms/Heading";
import { AlertIcon } from "@/components/atoms/Icon";
import type { HeadingLevel } from "@/types/components";
import styles from "./ErrorMessage.module.css";

export interface ErrorMessageProps {
  title?: string;
  level?: HeadingLevel;
  message: string;
}

export function ErrorMessage({
  title = "Error",
  level = "h3",
  message,
}: ErrorMessageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <AlertIcon size={24} />
      </div>
      <div className={styles.content}>
        <Heading level={level} className={styles.title}>
          {title}
        </Heading>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
