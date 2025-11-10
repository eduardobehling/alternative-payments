"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Spinner } from "@/components/atoms/Spinner";
import { SearchInput } from "@/components/molecules/SearchInput";
import { ViewMode } from "@/components/molecules/ViewMode";
import { CharacterGridView } from "@/components/organisms/CharacterGridView";
import { CharacterListView } from "@/components/organisms/CharacterListView";
import type { Character } from "@/types/character";
import type { ViewModeType } from "@/types/components";
import styles from "./CharacterTable.module.css";

interface CharacterTableProps {
  characters: Character[];
  defaultViewMode?: ViewModeType;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onClearSearch?: () => void;
  totalCount?: number;
  loading?: boolean;
  loadingMore?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  emptyHint?: string;
  loadMoreTrigger?: ReactNode;
}

export function CharacterTable({
  characters,
  defaultViewMode = "table",
  searchTerm,
  onSearchChange,
  onClearSearch,
  totalCount,
  loading = false,
  loadingMore = false,
  searchPlaceholder = "Search characters by name...",
  emptyMessage = "No characters found",
  emptyHint,
  loadMoreTrigger,
}: CharacterTableProps) {
  const [viewMode, setViewMode] = useState<ViewModeType>(defaultViewMode);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  const handleClearSearch = () => {
    onClearSearch?.();
  };

  const LoadingState = () => {
    return (
      <div className={styles.loadingInitial}>
        <Spinner size="lg" />
        <p>Loading characters...</p>
      </div>
    );
  };

  const LoadingMoreState = () => {
    return (
      <div className={styles.loadingMore}>
        <Spinner size="md" />
        <p>Loading more characters...</p>
      </div>
    );
  };

  const EmptyState = () => {
    return (
      <div className={styles.emptyState}>
        <p>{emptyMessage}</p>
        {emptyHint && <p className={styles.emptyHint}>{emptyHint}</p>}
      </div>
    );
  };

  const ResultInfoState = () => {
    return (
      <div className={styles.resultsInfo}>
        <p className={styles.resultsText}>
          Found {totalCount || 0} character{totalCount !== 1 ? "s" : ""}
        </p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Controls */}
      <div className={styles.controls}>
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />
        <ViewMode value={viewMode} onChange={setViewMode} />
      </div>

      {/* Results info */}
      {totalCount !== undefined && <ResultInfoState />}

      {/* Initial loading */}
      {loading && characters.length === 0 ? (
        <LoadingState />
      ) : characters.length === 0 ? (
        <EmptyState />
      ) : (
        /* Show characters and load more trigger */
        <>
          {viewMode === "table" ? (
            <CharacterListView characters={characters} />
          ) : (
            <CharacterGridView characters={characters} />
          )}

          {/* Loading more */}
          {loadingMore && <LoadingMoreState />}

          {/* Load more trigger for infinite scroll */}
          {loadMoreTrigger}
        </>
      )}
    </div>
  );
}
