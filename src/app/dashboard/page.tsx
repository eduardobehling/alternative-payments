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

      <main className={styles.main} aria-label="Dashboard">
        <div className={styles.container}>
          <nav className={styles.navigation} aria-label="Navigation">
            <BackButton />
          </nav>

          <header className={styles.header}>
            <Heading level="h1" className={styles.title}>
              Character Analytics Dashboard
            </Heading>
            <p
              className={styles.subtitle}
              aria-describedby="dashboard-description"
            >
              Analyzing character distribution across locations from the Rick
              and Morty universe
            </p>
          </header>

          <section
            className={styles.chartSection}
            aria-labelledby="chart-title"
            aria-live="polite"
            aria-busy={loading}
          >
            <div className={styles.chartContainer}>
              {loading ? (
                <output
                  className={styles.loading}
                  aria-label="Loading chart data"
                >
                  <Spinner size="lg" />
                  <p className={styles.loadingText}>Loading chart data...</p>
                  <span className={styles.visuallyHidden}>
                    Please wait while we fetch and process the character data
                  </span>
                </output>
              ) : (
                <div
                  className={styles.chartWrapper}
                  role="img"
                  aria-label="Pie chart showing character distribution by location"
                >
                  <PieChart
                    data={data.byLocation}
                    title="Characters by Location"
                  />
                  <div className={styles.chartSummary}>
                    <p className={styles.summaryText}>
                      Displaying distribution of{" "}
                      <strong>{data.total} characters</strong> across multiple
                      locations in the Rick and Morty universe.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
