"use client";

import { useState } from "react";
import { BackButton } from "@/components/atoms/BackButton";
import { Heading } from "@/components/atoms/Heading";
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
    <main className={styles.main}>
      <div className={styles.container}>
        <BackButton />
        <header className={styles.header}>
          <Heading>Rick and Morty Characters</Heading>
          <p className={styles.subtitle}>
            Explore characters from the Rick and Morty universe
          </p>
        </header>

        {error && (
          <ErrorMessage
            title="Failed to load characters"
            message={error.message}
          />
        )}

        {!error && (
          <CharacterTable
            characters={characters}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearSearch={handleClearSearch}
            totalCount={totalCount}
            loading={loading && currentPage === 1}
            loadingMore={loading && currentPage > 1}
            emptyHint={
              debouncedSearchTerm ? "Try adjusting your search term" : undefined
            }
            loadMoreTrigger={
              <div ref={loadMoreRef} className={styles.loadMoreTrigger} />
            }
          />
        )}
      </div>
    </main>
  );
}
