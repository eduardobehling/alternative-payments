import Link from "next/link";
import styles from "./BackButton.module.css";

export interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({
  href = "/",
  label = "← Back to Home",
}: BackButtonProps) {
  return (
    <Link href={href} className={styles.backButton}>
      {label}
    </Link>
  );
}
