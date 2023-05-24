import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPokemons, getPokemonDetails } from "./api/pokemon";
import { Loader } from "./components/Loader";
import { URL10 } from "./helpers/constants";
import { TypesList } from "./components/TypesList";
import { SelectOption } from "./types/SelectOption";
import { Card } from "./components/Card";
import { PokemonPerPageSelect as Select } from "./components/Select";
import { Search } from "./components/Search";
import { SingleValue } from "react-select";
import { filterByType } from "./helpers/helperFunctions";
import { Button } from "./components/Button";

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

  const handleSelectChange = (option: SingleValue<SelectOption>) => {
    if (option) {
      setPageUrl(option.value);
    }
  };

  const handlePreviousPage = useCallback(() => {
    if (data?.previous) {
      setPageUrl(data.previous);
    }
  }, [data]);

  const handleNextPage = useCallback(() => {
    if (data?.next) {
      setPageUrl(data.next);
    }
  }, [data]);

  useEffect(() => {
    if (!query) {
      setFilteredData(pokemonList);
      return;
    }

    const lowerCasedQuery = query.toLowerCase();
    const filteredData = query
      ? pokemonList?.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(lowerCasedQuery)
        )
      : pokemonList;

    setFilteredData(filteredData);
  }, [query, pokemonList]);

  const handleSearchValueChange = useCallback(
    (value: string) => {
      if (value) {
        filterByType(
          value,
          filterArray,
          setFilterArray,
          pokemonList,
          setFilteredData
        );
      }
    },
    [filterArray, pokemonList]
  );

  return (
    <>
      <h1 className="text-red-500 text-3xl font-bold underline">
        This is Pokedex!
      </h1>

      <div className="text-slate-800">
        <TypesList filter={handleSearchValueChange} />

        <div className="flex justify-center">
          <Select handleChange={handleSelectChange} />
          <Search filterValue={query} handleFilter={setQuery} />
        </div>

        <div className="flex flex-wrap mx-9 my-4">
          {(areDetailsLoading || isLoading) && <Loader />}
          {filteredData?.length &&
            !areDetailsLoading &&
            filteredData.map((pokemon) => (
              <Card key={pokemon.name} {...pokemon} />
            ))}
            {
              !areDetailsLoading && filteredData?.length == 0 && (
                <p>There aren't pokemons here!</p>
              )
            }
          {/* {(areDetailsLoading || isLoading) ? (
            <Loader />
          ) : filteredData?.length && !areDetailsLoading ? (
            filteredData.map((pokemon) => (
              <Card key={pokemon.name} {...pokemon} />
            ))
          ) : (
            <p>There aren't pokemons here!</p>
          )} */}
        </div>

        {!isLoading && (
          <>
            <Button
              handleAction={handlePreviousPage}
              disabled={!data?.previous}
            >
              Previous
            </Button>
            <Button handleAction={handleNextPage} disabled={!data?.next}>
              Next
            </Button>
          </>
        )}

        {isError && <p>Error!</p>}
      </div>
    </>
  );
};

export default App;
