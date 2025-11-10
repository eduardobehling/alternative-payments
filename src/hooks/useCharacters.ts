import { useQuery } from "@apollo/client/react";
import { useEffect, useRef, useState } from "react";
import { GET_CHARACTERS } from "@/graphql/queries/characters";
import type { Character, CharactersData } from "@/types/character";
import type { UseCharactersOptions } from "@/types/hooks";

export function useCharacters({ searchTerm }: UseCharactersOptions) {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const currentPageRef = useRef(1);
  const previousSearchRef = useRef(searchTerm);
  const hasLoadedMoreRef = useRef(false);

  const { loading, error, data, fetchMore } = useQuery<CharactersData>(
    GET_CHARACTERS,
    {
      variables: {
        page: 1,
        filter: searchTerm ? { name: searchTerm } : null,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    },
  );

  useEffect(() => {
    if (data?.characters.results) {
      if (!hasLoadedMoreRef.current && allCharacters.length === 0) {
        // Initial load only - when we have no characters yet
        setAllCharacters(data.characters.results);
      } else if (previousSearchRef.current !== searchTerm) {
        // New search term - reset characters
        setAllCharacters(data.characters.results);
        currentPageRef.current = 1;
        previousSearchRef.current = searchTerm;
        hasLoadedMoreRef.current = false;
      }
      // If hasLoadedMoreRef is true, ignore updates from initial query
    }
  }, [searchTerm, data, allCharacters.length]);

  const loadMore = () => {
    const nextPage = currentPageRef.current + 1;
    hasLoadedMoreRef.current = true; // Mark that we've started loading more

    fetchMore({
      variables: {
        page: nextPage,
        filter: searchTerm ? { name: searchTerm } : null,
      },
    })
      .then((result) => {
        if (result.data?.characters.results) {
          setAllCharacters((prevChars) => {
            const existingIds = new Set(prevChars.map((char) => char.id));
            const newChars =
              result.data?.characters.results.filter(
                (char) => !existingIds.has(char.id),
              ) || [];
            return [...prevChars, ...newChars];
          });
          currentPageRef.current = nextPage;
        }
      })
      .catch((err) => {
        console.error("Error fetching more characters:", err);
        hasLoadedMoreRef.current = false; // Reset on error
      });
  };

  return {
    characters: allCharacters,
    loading,
    error,
    hasMore: !!data?.characters.info.next,
    totalCount: data?.characters.info.count,
    currentPage: currentPageRef.current,
    loadMore,
  };
}
