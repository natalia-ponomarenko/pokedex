import { useCallback, useEffect, useState } from "react";
import { getPokemons, getPokemonsByType } from "../../api/pokemon";
import { Search } from "../../components/Search";
import { Loader } from "../../components/Loader";
import { PokemonList } from "../../components/PokemonList";
import { Error } from "../../components/Error";
import { filterByQuery } from "../../utils/helperFunctions";
import { ReturnButton } from "../../components/ReturnButton";
import { TypesList } from "../../components/TypesList";
import { TYPE_URL, URL_ALL_POKEMONS, dropDownTransitionClasses } from "../../utils/constants";
import { Pokemon } from "../../types/Pokemon";
import { usePokemonQuery } from "../../hooks/usePokemonQuery";
import { Transition } from "@headlessui/react";

export const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [isShowing, setIsShowing] = useState<boolean>(false);

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

      <Transition show={isShowing} {...dropDownTransitionClasses}>
        <TypesList setFilter={setFilter} />
      </Transition>
      <div className="flex justify-center px-2 mt-4">
      <button
        className="px-2.5 py-2 mb-1 text-white mr-1 rounded transition ease-in-out delay-100 bg-red-600 hover:bg-juicy-red"
        onClick={() => setIsShowing((isShowing) => !isShowing)}
      >
        <i className="fa-solid fa-star"></i>
      </button>
        <div className="mr-2">
          <ReturnButton handleAction={resetFiltersAndRetrieveList} />
        </div>
        <Search setQuery={setQuery} setLoading={setLoading} />
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
