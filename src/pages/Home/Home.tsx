import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { getPokemons, getPokemonDetails } from "../../api/pokemon";
import { URL20, URL_ALL } from "../../helpers/constants";
import { Search } from "../../components/Search";
import { Loader } from "../../components/Loader";
import { PokemonList } from "../../components/PokemonList";
import { Error } from "../../components/Error";
import { Pokemon } from "../../types/Pokemon";
import { filterByQuery } from "../../helpers/helperFunctions";
import { ReturnButton } from "../../components/ReturnButton";


export const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoading, isError, data } = useQuery(["pokemons"], () =>
    getPokemons(URL_ALL)
  );

  const { data: pokemonList, isLoading: areDetailsLoading } = useQuery({
    queryKey: ["pokemonDetails", data],
    queryFn: () => getPokemonDetails(data),
    enabled: !!data,
  });

  const [filteredPokemonList, setFilteredPokemonList] = useState<
    Pokemon[] | undefined
  >(pokemonList);

  useEffect(() => {
    setFilteredPokemonList(filterByQuery(query, pokemonList));
  }, [query, pokemonList]);

  const handleButtonClick = useCallback(() => {
    setFilteredPokemonList(pokemonList);
    setQuery("");
  }, [pokemonList]);

  const isLoadingInProgress = isLoading || areDetailsLoading || loading;
  const shouldDisplayReturnButton =
    (filteredPokemonList?.length === 0 || filteredPokemonList?.length === 1) &&
    !isLoadingInProgress;

  return (
    <div className="text-slate-800 lg:max-w-[1450px] mx-auto">
      <div className="flex justify-center relative px-2">
        <Search setQuery={setQuery} setLoading={setLoading} />
      </div>

      <div className="flex flex-col mx-9 my-4 justify-center items-center">
        {isLoadingInProgress && !isError ? (
          <Loader />
        ) : (
          <PokemonList list={filteredPokemonList} />
        )}
        {isError && <Error text="Ooops! Something went wrong..." />}
        {filteredPokemonList?.length === 0 && !isLoadingInProgress && (
          <Error text="Sorry, pokemon isn't found" />
        )}
        {shouldDisplayReturnButton && (
          <ReturnButton handleAction={handleButtonClick} />
        )}
      </div>
    </div>
  );
};
