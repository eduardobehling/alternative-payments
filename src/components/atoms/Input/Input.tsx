import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.wrapper}>
      <input className={`${styles.input} ${className}`} {...props} />
    </div>
  );
}
