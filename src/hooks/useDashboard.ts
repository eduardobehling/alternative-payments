import { useEffect, useMemo, useState } from "react";
import { GET_CHARACTERS_WITH_LOCATION } from "@/graphql/queries/characters";
import createApolloClient from "@/lib/apolloClient";
import type { ChartDataItem, DashboardData } from "@/types/dashboard";

interface CharacterWithLocation {
  id: string;
  name: string;
  location: {
    id: string;
    name: string;
  };
}

interface CharactersWithLocationResponse {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: CharacterWithLocation[];
  };
}

export function useDashboard() {
  const [charactersWithLocation, setCharactersWithLocation] = useState<
    CharacterWithLocation[]
  >([]);
  const [charactersLoaded, setCharactersLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all characters with location data
  useEffect(() => {
    if (charactersLoaded) return;

    const fetchAllCharacters = async () => {
      setIsLoading(true);
      try {
        const client = createApolloClient();
        const firstPage = await client.query<CharactersWithLocationResponse>({
          query: GET_CHARACTERS_WITH_LOCATION,
          variables: { page: 1 },
        });

        if (!firstPage.data) return;

        const totalPages = firstPage.data.characters.info.pages;
        const allResults: CharacterWithLocation[] = [
          ...firstPage.data.characters.results,
        ];

        // Fetch remaining pages
        if (totalPages > 1) {
          const promises = [];
          for (let page = 2; page <= totalPages; page++) {
            promises.push(
              client.query<CharactersWithLocationResponse>({
                query: GET_CHARACTERS_WITH_LOCATION,
                variables: { page },
              }),
            );
          }

          const results = await Promise.all(promises);
          for (const result of results) {
            if (result.data) {
              allResults.push(...result.data.characters.results);
            }
          }
        }

        setCharactersWithLocation(allResults);
        setCharactersLoaded(true);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCharacters();
  }, [charactersLoaded]);

  // Process data into chart format - Group characters by location
  const dashboardData: DashboardData = useMemo(() => {
    const total = charactersWithLocation.length;
    const locationMap = new Map<string, number>();

    charactersWithLocation.forEach((character) => {
      const locationName = character.location?.name || "Unknown Location";
      locationMap.set(locationName, (locationMap.get(locationName) || 0) + 1);
    });

    // Convert to chart data format
    const locationData: ChartDataItem[] = Array.from(locationMap.entries())
      .map(([name, count]) => ({
        name,
        value: count,
        percentage: total > 0 ? Math.round((count / total) * 100 * 10) / 10 : 0,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 locations

    // Calculate "Other" category for locations
    const topLocationTotal = locationData.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    const otherLocationCount = total - topLocationTotal;
    if (otherLocationCount > 0) {
      locationData.push({
        name: "Other Locations",
        value: otherLocationCount,
        percentage:
          total > 0
            ? Math.round((otherLocationCount / total) * 100 * 10) / 10
            : 0,
      });
    }

    return {
      byLocation: locationData,
      total,
    };
  }, [charactersWithLocation]);

  return {
    data: dashboardData,
    loading: isLoading,
  };
}
