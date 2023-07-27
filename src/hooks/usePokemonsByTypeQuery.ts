import { getPokemonsByType } from "../api/pokemon";
import { API_URLS } from "../api/apiUrls";
import { usePokemonQuery } from "./usePokemonQuery";

type Props = {
  filter: string;
};

export const usePokemonsByTypeQuery = ({
  filter,
}: Props) => {
  const {
    data: typeData,
    isLoading: areTypesLoading,
    isError: isTypeError,
  } = usePokemonQuery(["pokemonsByType", filter], () =>
    getPokemonsByType(`${API_URLS.allByType}${filter}`)
  );

  return {
    typeData,
    areTypesLoading,
    isTypeError,
  };
};
