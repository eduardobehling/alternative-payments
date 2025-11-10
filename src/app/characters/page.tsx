"use client";

import { useState } from "react";
import { BackButton } from "@/components/atoms/BackButton";
import { Heading } from "@/components/atoms/Heading";
import { PageHead } from "@/components/atoms/PageHead";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { CharacterTable } from "@/components/organisms/CharacterTable";
import { useCharacters } from "@/hooks/useCharacters";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import styles from "./page.module.css";

export default function CharactersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    characters,
    loading,
    error,
    hasMore,
    totalCount,
    currentPage,
    loadMore,
  } = useCharacters({ searchTerm: debouncedSearchTerm });

  const loadMoreRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    isLoading: loading,
  });

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <PageHead
        title="Rick and Morty Characters | Alternative Payments"
        description="Explore characters from the Rick and Morty universe. Search through hundreds of characters with detailed information."
        keywords="Rick and Morty, characters, TV show, cartoon, Adult Swim"
        canonicalUrl="/characters"
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <nav aria-label="Navigation">
            <BackButton />
          </nav>

          <header className={styles.header}>
            <Heading level="h1">Rick and Morty Characters</Heading>
            <p className={styles.subtitle}>
              Explore characters from the Rick and Morty universe
            </p>
          </header>

          {error && (
            <section aria-labelledby="error-heading">
              <ErrorMessage
                title="Failed to load characters"
                message={error.message}
              />
            </section>
          )}

          {!error && (
            <section aria-labelledby="characters-heading">
              <CharacterTable
                characters={characters}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onClearSearch={handleClearSearch}
                totalCount={totalCount}
                loading={loading && currentPage === 1}
                loadingMore={loading && currentPage > 1}
                emptyHint={
                  debouncedSearchTerm
                    ? "Try adjusting your search term"
                    : undefined
                }
                loadMoreTrigger={
                  <div ref={loadMoreRef} className={styles.loadMoreTrigger} />
                }
              />
            </section>
          )}
        </div>
      </main>
    </>
  );
}
