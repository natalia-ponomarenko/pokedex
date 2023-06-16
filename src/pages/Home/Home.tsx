import { useCallback, useEffect, useState } from "react";
import { getPokemons, getPokemonsByType } from "../../api/pokemon";
import { Search } from "../../components/Search";
import { Loader } from "../../components/Loader";
import { PokemonList } from "../../components/PokemonList";
import { Error } from "../../components/Error";
import { filterByQuery } from "../../utils/helperFunctions";
import { ReturnButton } from "../../components/ReturnButton";
import { TypesList } from "../../components/TypesList";
import { TYPE_URL, URL_ALL_POKEMONS } from "../../utils/constants";
import { Pokemon } from "../../types/Pokemon";
import { usePokemonQuery } from "../../hooks/usePokemonQuery";

export const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const {
    isLoading,
    isError,
    data: pokemonList,
  } = usePokemonQuery(["pokemons"], () => getPokemons(URL_ALL_POKEMONS));

  const {
    isLoading: areTypeLoading,
    isError: isTypeError,
    data: typeData,
  } = usePokemonQuery(["pokemonsByType", filter], () =>
    getPokemonsByType(`${TYPE_URL}${filter}`)
  );

  const [filteredPokemonList, setFilteredPokemonList] = useState<
    Pokemon[] | undefined
  >(pokemonList);

  useEffect(() => {
    setFilteredPokemonList(typeData);
  }, [filter, typeData]);

  useEffect(() => {
    setFilteredPokemonList(filterByQuery(query, pokemonList));
  }, [query, pokemonList]);

  const resetFiltersAndRetrieveList = useCallback(() => {
    setFilteredPokemonList(pokemonList);
  }, [pokemonList]);

  const isLoadingInProgress = isLoading || loading || areTypeLoading;
  const error = isError || isTypeError;

  return (
    <div className="text-slate-800 lg:max-w-[1450px] mx-auto">
      <TypesList setFilter={setFilter} />
      <div className="flex justify-center px-2 mt-4">
        <Search setQuery={setQuery} setLoading={setLoading} />
        <ReturnButton handleAction={resetFiltersAndRetrieveList} />
      </div>

      <div className="flex flex-col mx-9 my-4 justify-center items-center">
        {isLoadingInProgress && !error ? (
          <Loader />
        ) : (
          <PokemonList list={filteredPokemonList} />
        )}
        {error && <Error text="Ooops! Something went wrong..." />}
        {filteredPokemonList?.length === 0 && !isLoadingInProgress && (
          <Error text="Apologies, but what you're looking for could not be found" />
        )}
      </div>
    </div>
  );
};
