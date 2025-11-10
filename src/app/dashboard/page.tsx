"use client";

import { BackButton } from "@/components/atoms/BackButton";
import { Heading } from "@/components/atoms/Heading";
import { PageHead } from "@/components/atoms/PageHead";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <>
      <PageHead
        title="Character Analytics Dashboard | Alternative Payments"
        description="Analyze Rick and Morty character data with interactive dashboards and visualizations. Get insights into character statistics and trends across the multiverse."
        keywords="Rick and Morty, dashboard, analytics, character data, statistics, data visualization"
        canonicalUrl="/dashboard"
      />

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
    </>
  );
}
