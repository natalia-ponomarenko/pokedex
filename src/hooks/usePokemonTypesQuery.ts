import { useQuery } from "@tanstack/react-query";
import { getPokemonTypes } from "../api/pokemon";

export const usePokemonTypesQuery = () => {
  const { data, isLoading, isError } = useQuery(["types"], getPokemonTypes);

  return {
    data,
    isLoading,
    isError,
  };
};
