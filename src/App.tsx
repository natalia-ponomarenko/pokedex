import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SingleValue } from "react-select";
import { getAllPokemons, getPokemonDetails } from "./api/pokemon";
import { URL10 } from "./helpers/constants";
import { SelectOption } from "./types/SelectOption";
import { TypesList } from "./components/TypesList";
import { Loader } from "./components/Loader";
import { PokemonPerPageSelect as Select } from "./components/Select";
import { Search } from "./components/Search";
import { filterByQuery, filterByType } from "./helpers/helperFunctions";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { PokemonList } from "./components/PokemonList";
import { Error } from "./components/Error";

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

  useEffect(() => {
    const preparedListOfPokemons = filterByQuery(query, pokemonList);
    setFilteredData(preparedListOfPokemons);
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

  const handleSelectChange = useCallback((option: SingleValue<SelectOption>) => {
    if (option) {
      setPageUrl(option.value);
    }
  }, [setPageUrl]);

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

  const isLodingInProgress = isLoading || areDetailsLoading;
  const noPokemonsFound =
    filterArray.length !== 0 && filteredData?.length === 0;

  return (
    <>
      <Header />

      <div className="text-slate-800 ml-screen-offset">
        <TypesList filter={handleFilterChange} />

        <div className="flex justify-center px-2">
          <Select handleChange={handleSelectChange} />
          <Search filterValue={query} handleFilter={setQuery} />
        </div>

        <div className="flex flex-col mx-9 my-4 justify-center items-center">
          {isLodingInProgress ? (
            <Loader />
          ) : (
            <>
              <div className="flex justify-center">
                <Button
                  handleAction={handlePreviousPage}
                  disabled={!data?.previous}
                >
                  Previous
                </Button>
                <Button handleAction={handleNextPage} disabled={!data?.next}>
                  Next
                </Button>
              </div>
              <PokemonList list={filteredData} />
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
