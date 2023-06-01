import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  filterByQuery,
  filterByType,
  resetFilters,
} from "./helpers/helperFunctions";
import { getAllPokemons, getPokemonDetails } from "./api/pokemon";
import { URL10 } from "./helpers/constants";
import { useQuery } from "@tanstack/react-query";
import { SingleValue } from "react-select";
import { SelectOption } from "./types/SelectOption";
import { TypesList } from "./components/TypesList";
import { Loader } from "./components/Loader";
import { PokemonPerPageSelect as Select } from "./components/Select";
import { Search } from "./components/Search";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { PokemonList } from "./components/PokemonList";
import { Error } from "./components/Error";
import { Pokemon } from "./types/Pokemon";

const App: React.FC = () => {
  const [pageUrl, setPageUrl] = useState(URL10);
  const [query, setQuery] = useState("");
  const [filterArray, setFilterArray] = useState<string[]>([]);

  const { isLoading, isError, data } = useQuery(["pokemons", pageUrl], () =>
    getAllPokemons(pageUrl)
  );

  const { data: pokemonList, isLoading: areDetailsLoading } = useQuery({
    queryKey: ["pokemonDetails", data],
    queryFn: () => getPokemonDetails(data),
  });

  const [filteredData, setFilteredData] = useState(pokemonList);
  const [collection, setCollection] = useState<Pokemon[] | []>([]);

  useEffect(() => {
    const preparedListOfPokemons = filterByQuery(query, pokemonList);
    setFilteredData(preparedListOfPokemons);
    setFilterArray([]);
    resetFilters();
  }, [query, pokemonList]);

  const handleFilterChange = useCallback(
    (value: string) => {
      const result = filterByType(value, filterArray, pokemonList);
      setFilterArray(result.updatedFilterList);
      setFilteredData(
        result.updatedFilterList.length !== 0
          ? result.filteredData
          : pokemonList
      );
    },
    [filterArray, pokemonList]
  );

  const handlePageChange = useCallback(
    (update?: string | null, option?: SingleValue<SelectOption>) => {
      if (update) {
        setPageUrl(update);
      }

      if (option) {
        setPageUrl(option.value);
      }

      setFilterArray([]);
      resetFilters();
    },
    [setPageUrl, setFilterArray]
  );

  const isPokemonInCollection = useMemo(() => {
      return (pokemon: Pokemon) => collection.some((pokemonCard) => pokemonCard.id === pokemon.id);
    },
    [collection]
  );

  const addPokemon = useCallback(
    (pokemon: Pokemon) => {
      if (!isPokemonInCollection(pokemon)) {
        setCollection([...collection, pokemon]);
      }
    },
    [collection, isPokemonInCollection]
  );

  const removePokemon = useCallback(
    (name: string) => {
      const updatedCollection = collection.filter(
        (pokemon) => pokemon.name !== name
      );
      setCollection(updatedCollection);
    },
    [collection]
  );

  const isLodingInProgress = isLoading || areDetailsLoading;
  const noPokemonsFound =
    filterArray.length !== 0 && filteredData?.length === 0;
  return (
    <>
      <Header />

      <div className="text-slate-800 ml-screen-offset">
        <TypesList filter={handleFilterChange} />

        <div className="flex justify-center px-2">
          <Select handleChange={handlePageChange} />
          <Search filterValue={query} handleFilter={setQuery} />
        </div>

        <div className="flex flex-col mx-9 my-4 justify-center items-center">
          {isLodingInProgress ? (
            <Loader />
          ) : (
            <>
              {collection.length !== 0 && (
                <div>
                  {collection.map((pok) => (
                    <>
                      <p>{pok.name}</p>
                      <button onClick={() => removePokemon(pok.name)}>
                        Remove
                      </button>
                    </>
                  ))}
                </div>
              )}
              <div className="flex justify-center">
                <Button
                  handleAction={() => handlePageChange(data?.previous)}
                  disabled={!data?.previous}
                >
                  Previous
                </Button>
                <Button
                  handleAction={() => handlePageChange(data?.next)}
                  disabled={!data?.next}
                >
                  Next
                </Button>
              </div>
              <PokemonList
                list={filteredData}
                addPokemon={addPokemon}
                removePokemon={removePokemon}
                isInCollection={isPokemonInCollection}
              />
            </>
          )}

          {isError && <Error text="Ooops! Something went wrong..." />}
          {noPokemonsFound && !isLodingInProgress && (
            <Error text="No pokemons found!" />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
