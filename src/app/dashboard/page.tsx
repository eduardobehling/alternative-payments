"use client";

import { BackButton } from "@/components/atoms/BackButton";
import { Heading } from "@/components/atoms/Heading";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <BackButton />

        <header className={styles.header}>
          <Heading level="h1">Character Analytics Dashboard</Heading>
          <p className={styles.subtitle}>Dashboard Page</p>
        </header>

        <section>Content here</section>
      </div>
    </main>
  );
}
