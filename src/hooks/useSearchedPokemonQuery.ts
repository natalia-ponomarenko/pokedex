import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../api/pokemon";
import { API_URLS } from "../api/apiUrls";
import { Pokemon } from "../types/Pokemon";

export const useSearchedPokemonQuery = (value: string) => {
  const query = useQuery<Pokemon | null, Error>(
    ["pokemon", value],
    async () => {
      if (value) {
        const lowerCasedRequest = value.toLowerCase();
        const data = await getPokemon(
          `${API_URLS.pokemon}${lowerCasedRequest}`
        );
        return data;
      }
      return null;
    },
    {
      enabled: !!value,
      retry: false,
    }
  );

  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== "idle",
  };
};
