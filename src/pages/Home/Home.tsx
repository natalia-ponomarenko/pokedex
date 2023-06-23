import { useCallback, useEffect, useState } from "react";
import { getPokemons, getPokemonsByType } from "../../api/pokemon";
import { Search } from "../../components/Search";
import { Loader } from "../../components/Loader";
import { PokemonList } from "../../components/PokemonList";
import { Error } from "../../components/Error";
import { TypesList } from "../../components/TypesList";
import {
  TYPE_URL,
  URL_ALL_POKEMONS,
  DROPDOWN_TRANSITION,
} from "../../utils/constants";
import { Pokemon } from "../../types/Pokemon";
import { usePokemonQuery } from "../../hooks/usePokemonQuery";
import { Transition } from "@headlessui/react";
import { NavigationButton } from "../../components/buttons/NavigationButton";

export const Home: React.FC = () => {
  const [isPokemonLoading, setPokemonLoading] = useState<boolean>(false);
  const [isPokemonError, setPokemonError] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const {
    isLoading,
    isError,
    data: pokemonList,
  } = usePokemonQuery(["pokemons"], () => getPokemons(URL_ALL_POKEMONS));

  const {
    isLoading: areTypesLoading,
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
    setPokemon(null);
    setPokemonError(false);
  }, [filter, typeData]);

  useEffect(() => {
    setFilteredPokemonList(pokemonList);
  }, [pokemonList]);

  const resetFiltersAndRetrieveList = useCallback(() => {
    setFilteredPokemonList(pokemonList);
    setPokemon(null);
    setPokemonError(false);
  }, [pokemonList]);

  const isLoadingInProgress = isLoading || areTypesLoading || isPokemonLoading;
  const error = isError || isTypeError;

  return (
    <div className="text-slate-800 lg:max-w-[1450px] mx-auto font-poppins">
      <Transition show={isShowing} {...DROPDOWN_TRANSITION}>
        <TypesList setFilter={setFilter} />
      </Transition>
      <div className="flex justify-center px-2 mt-4">
        <NavigationButton
          title="Filter by type"
          iconClassName="fa-star"
          className="navigation_button px-2.5 mb-1 mr-1"
          handleAction={() => setIsShowing((isShowing) => !isShowing)}
        />
        <div className="mr-2">
          <NavigationButton
            className="px-2.5 navigation_button"
            iconClassName="fa-house"
            title="Return to the main list"
            handleAction={resetFiltersAndRetrieveList}
          />
        </div>
        <Search
          setPokemon={setPokemon}
          setPokemonLoading={setPokemonLoading}
          setPokemonError={setPokemonError}
        />
      </div>

      <div className="main-container">
        {pokemon ? (
          <PokemonList list={[pokemon]} />
        ) : isLoadingInProgress && !error ? (
          <Loader />
        ) : error ? (
          <Error text="Something went wrong" />
        ) : (filteredPokemonList?.length === 0 && !isLoadingInProgress) ||
          isPokemonError ? (
          <Error text="Apologies, but what you're looking for could not be found" />
        ) : (
          <PokemonList list={filteredPokemonList} />
        )}
      </div>
    </div>
  );
};
