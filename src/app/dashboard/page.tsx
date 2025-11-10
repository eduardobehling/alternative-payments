"use client";

import { BackButton } from "@/components/atoms/BackButton";
import { Heading } from "@/components/atoms/Heading";
import { PageHead } from "@/components/atoms/PageHead";
import { Spinner } from "@/components/atoms/Spinner";
import { PieChart } from "@/components/molecules/PieChart";
import { useDashboard } from "@/hooks/useDashboard";
import styles from "./page.module.css";

export default function DashboardPage() {
  const { data, loading } = useDashboard();

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
            <p className={styles.subtitle}>
              Analyzing characters location from the Rick and Morty universe
            </p>
          </header>

          {/* Main Chart */}
          <section className={styles.chartSection}>
            {loading ? (
              <div className={styles.loading}>
                <Spinner size="lg" />
                <p>Loading chart data...</p>
              </div>
            ) : (
              <PieChart data={data.byLocation} title="Characters by Location" />
            )}
          </section>
        </div>
      </main>
    </>
  );
}
