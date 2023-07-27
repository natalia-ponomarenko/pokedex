import { QueryKey, useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../api/pokemon";
import { PokemonApiResponse } from "../types/PokemonApiResponse";
import { PokemonsByTypeApiResponse } from "../types/PokemonsByTypeApiResponse";

type FetchFunction<T> = () => Promise<T>;

export const usePokemonQuery = <
  T extends PokemonApiResponse | PokemonsByTypeApiResponse
>(
  queryKey: QueryKey,
  fetchFunction: FetchFunction<T>
) => {
  return useQuery(
    queryKey,
    async () => {
      const data = await fetchFunction();
      const pokemonDetails = await getPokemonDetails(data);
      return pokemonDetails;
    }
  );
};
