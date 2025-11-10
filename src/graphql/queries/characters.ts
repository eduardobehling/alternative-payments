import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
        episode {
          id
          name
          episode
        }
        created
      }
    }
  }
`;

// Query to fetch characters with location data for grouping by location
export const GET_CHARACTERS_WITH_LOCATION = gql`
  query GetCharactersWithLocation($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        location {
          id
          name
        }
      }
    }
  }
`;
