import Link from "next/link";
import { Heading } from "@/components/atoms/Heading";
import { ChartIcon, PaletteIcon, UsersIcon } from "@/components/atoms/Icon";
import { PageHead } from "@/components/atoms/PageHead";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <PageHead
        title="Rick and Morty Universe | Alternative Payments"
        description="Explore the vast multiverse of Rick and Morty through our interactive platform. Discover characters, analyze data, and dive deep into the fascinating world created by Dan Harmon and Justin Roiland."
        keywords="Rick and Morty, universe, characters, dashboard, analytics, multiverse, Alternative Payments"
        canonicalUrl="/"
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <Heading level="h1">Welcome to Rick and Morty Universe</Heading>
            <p className={styles.description}>
              Explore the vast multiverse of Rick and Morty through our
              interactive platform. Discover characters, analyze data, and dive
              deep into the fascinating world created by Dan Harmon and Justin
              Roiland.
            </p>
          </header>

          <section className={styles.features}>
            <Link href="/characters" className={styles.featureCard}>
              <div className={styles.cardIcon}>
                <UsersIcon size={48} />
              </div>
              <Heading level="h2" className={styles.cardTitle}>
                Characters
              </Heading>
              <span className={styles.cardLink}>Explore Characters →</span>
            </Link>

            <Link href="/dashboard" className={styles.featureCard}>
              <div className={styles.cardIcon}>
                <ChartIcon size={48} />
              </div>
              <Heading level="h2" className={styles.cardTitle}>
                Dashboard
              </Heading>
              <span className={styles.cardLink}>View Analytics →</span>
            </Link>

            <Link href="/styleguide" className={styles.featureCard}>
              <div className={styles.cardIcon}>
                <PaletteIcon size={48} />
              </div>
              <Heading level="h2" className={styles.cardTitle}>
                Styleguide
              </Heading>
              <span className={styles.cardLink}>View Styleguide →</span>
            </Link>
          </section>

          <footer className={styles.footer}>
            <p className={styles.footerText}>
              Developed by{" "}
              <a
                href="https://github.com/eduardobehling"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                @eduardobehling
              </a>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
