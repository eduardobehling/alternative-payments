import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Header info</h1>
        </header>

        <section className={styles.section}>
          Section info
        </section>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Footer Info
          </p>
        </footer>
      </div>
    </main>
  );
}
