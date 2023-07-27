import React, { useState } from "react";
import { MagnifyingGlassIcon } from "../MagnifyingGlassIcon";
import { Pokemon } from "../../types/Pokemon";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";

type Props = {
  setSearchedValue: (value: string) => void;
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<Pokemon | null, Error>>;
  setPokemon: (pokemon: Pokemon | null) => void;
};

export const Search: React.FC<Props> = ({
  setSearchedValue,
  setPokemon,
  refetch,
}) => {
  const [value, setValue] = useState("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleButtonClick = () => {
    setSearchedValue(value);
    refetch();
    setPokemon(null);
    setValue("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="search-query"
        className="input"
        placeholder="Find a pokemon"
        value={value}
        onChange={handleInputValue}
      />
      <button
        type="submit"
        className="input-button"
        onClick={handleButtonClick}
        disabled={!value.length}
      >
        <MagnifyingGlassIcon />
      </button>
    </div>
  );
};
