import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPokemons, getPokemonDetails } from "./api/pokemon";
import { Loader } from "./components/Loader";
import { URL10 } from "./helpers/constants";
import { TypesList } from "./components/TypesList";
import Select, { SingleValue } from "react-select";
import { options } from "./helpers/constants";
import { SelectOption } from "./types/SelectOption";
import { Card } from "./components/Card";

const App: React.FC = () => {
  const [pageUrl, setPageUrl] = useState(URL10);
  const [filter, setFilter] = useState("");
  const [filterArray, setFilterArray] = useState([]);

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

  const handlePreviousPage = () => {
    if (data?.previous) {
      setPageUrl(data.previous);
    }
  };

  const handleNextPage = () => {
    if (data?.next) {
      setPageUrl(data.next);
    }
  };

  useEffect(() => {
    if (!filter) {
      setFilteredData(pokemonList);
      return;
    }
    const query = filter.toLowerCase();
    const filteredData = filter
      ? pokemonList?.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(query)
        )
      : pokemonList;
    setFilteredData(filteredData);
  }, [filter, pokemonList]);

  const filterByType = (name: string) => {
    const filterButton = document.getElementById(name);
    console.log(name);
    filterButton.classList.toggle("pressed");
    if (filterArray.includes(name)) {
      const index = filterArray.indexOf(name);
      if (index > -1) {
        filterArray.splice(index, 1);
      }
    } else {
      filterArray.push(name);
    }

    setFilterArray(filterArray);

    if (!filterArray.length) {
      setFilteredData(pokemonList);
      return;
    }

    const filteredData = pokemonList.filter((pokemon) =>
      pokemon.types.some((el) =>
        filterArray.includes(el.type.name.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  };

  return (
    <>
      <h1 className="text-red-500 text-3xl font-bold underline">
        This is Pokedex!
      </h1>
      <TypesList filter={filterByType} />

      <Select
        options={options}
        onChange={handleSelectChange}
        autoFocus={true}
        defaultValue={{ label: "10", value: URL10 }}
      />

      <input
        type="text"
        id="search-query"
        className="input is-success"
        placeholder="Start filter the pokemons!"
        value={filter}
        style={{ border: "1px dashed red" }}
        onChange={({ currentTarget: { value } }) => setFilter(value)}
      />

      {areDetailsLoading ? (
        <Loader />
      ) : filteredData?.length ? (
        filteredData?.map((pokemon) => <Card {...pokemon} />)
      ) : (
        <p>There aren't pokemons here!</p>
      )}
      {!isLoading && (
        <>
          <button onClick={handlePreviousPage} disabled={!data?.previous}>
            Previous Page
          </button>
          <button onClick={handleNextPage} disabled={!data?.next}>
            Next Page
          </button>
        </>
      )}
      {isError && <p>Error!</p>}
    </>
  );
};

export default App;
