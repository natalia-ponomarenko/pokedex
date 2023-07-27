import { useCallback, useEffect, useMemo, useState } from "react";
import { getPokemons } from "../../api/pokemon";
import { Search } from "../../components/Search";
import { Loader } from "../../components/Loader";
import { PokemonList } from "../../components/PokemonList";
import { Error } from "../../components/Error";
import { TypesList } from "../../components/TypesList";
import { API_URLS } from "../../api/apiUrls";
import { Pokemon } from "../../types/Pokemon";
import { usePokemonQuery } from "../../hooks/usePokemonQuery";
import { NavigationButton } from "../../components/buttons/NavigationButton";
import { SlideIn } from "../../components/SlideIn/SlideIn";
import { usePokemonsByTypeQuery } from "../../hooks/usePokemonsByTypeQuery";
import { useSearchedPokemonQuery } from "../../hooks/useSearchedPokemonQuery";
import { updateURLParams } from "../../utils/helperFunctions";

export const Home: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [pokemonError, setPokemonError] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    data: pokemonList,
  } = usePokemonQuery(["pokemons"], () => getPokemons(API_URLS.allPokemons));

  const {
    data: searchedPokemon,
    isError: isPokemonError,
    isLoading: isPokemonLoading,
    refetch,
  } = useSearchedPokemonQuery(searchedValue);

  const { typeData, areTypesLoading, isTypeError } = usePokemonsByTypeQuery({
    filter,
  });

  const memoizedURL = useMemo(() => new URL(window.location.href), []);
  const memoizedParams = useMemo(
    () => new URLSearchParams(memoizedURL.search),
    [memoizedURL]
  );

  const [filteredPokemonList, setFilteredPokemonList] = useState<
    Pokemon[] | undefined
  >(pokemonList);

  useEffect(() => {
    if (searchedPokemon) {
      setPokemon(searchedPokemon);
      setPokemonError(false);
      memoizedParams.set("pokemon", searchedPokemon.name);
      memoizedURL.search = memoizedParams.toString();
      window.history.pushState({}, "", memoizedURL);
    }
  }, [searchedPokemon, memoizedParams, memoizedURL]);

  useEffect(() => {
    const pokemonNameFromURL = memoizedParams.get("pokemon");

    if (pokemonNameFromURL) {
      setSearchedValue(pokemonNameFromURL);
    }
  }, [memoizedParams]);

  useEffect(() => {
    setFilteredPokemonList(typeData);
    setPokemon(null);
    setPokemonError(false);
  }, [filter, typeData]);

  useEffect(() => {
    if (!searchedPokemon) {
      setFilteredPokemonList(pokemonList);
    } else {
      setFilteredPokemonList([searchedPokemon]);
    }
  }, [pokemonList, searchedPokemon]);

  useEffect(() => {
    if (isPokemonError) {
      setPokemonError(true);
    }
  }, [isPokemonError]);

  const resetFiltersAndRetrieveList = useCallback(() => {
    setFilteredPokemonList(pokemonList);
    setPokemon(null);
    setPokemonError(false);
    updateURLParams();
  }, [pokemonList]);

  const isLoadingInProgress = isLoading || areTypesLoading || isPokemonLoading;
  const error = isError || isTypeError || pokemonError;

  return (
    <div className="text-slate-800 lg:max-w-[1450px] mx-auto font-poppins">
      {isShowing && (
        <SlideIn>
          <TypesList setFilter={setFilter} />
        </SlideIn>
      )}
      <div className="flex justify-center px-2 mt-4">
        <NavigationButton
          title="Filter by type"
          iconClassName="fa-star"
          className="navigation-button px-2.5 mb-1 mr-1"
          handleAction={() => setIsShowing((isShowing) => !isShowing)}
        />
        <div className="mr-2">
          <NavigationButton
            className="px-2.5 navigation-button"
            iconClassName="fa-house"
            title="Return to the main list"
            handleAction={resetFiltersAndRetrieveList}
          />
        </div>
        <Search
          setSearchedValue={setSearchedValue}
          refetch={refetch}
          setPokemon={setPokemon}
        />
      </div>
      <div className="main-container">
        {isLoadingInProgress && <Loader />}
        {pokemon && !isLoadingInProgress && <PokemonList list={[pokemon]} />}
        {!pokemon &&
          !isLoadingInProgress &&
          !error &&
          filteredPokemonList?.length !== 0 && (
            <PokemonList list={filteredPokemonList} />
          )}
        {(error || filteredPokemonList?.length === 0) && (
          <Error text="Apologies, but what you're looking for could not be found" />
        )}
      </div>
    </div>
  );
};
