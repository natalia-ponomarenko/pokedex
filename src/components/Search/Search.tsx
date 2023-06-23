import React, { useState } from "react";
import { Icon } from "../Icon";
import { getPokemon } from "../../api/pokemon";
import { Pokemon } from "../../types/Pokemon";
import { BASE_URL } from "../../utils/constants";

type Props = {
  setPokemon: (pokemon: Pokemon | null) => void;
  setPokemonLoading: (loading: boolean) => void;
  setPokemonError: (error: boolean) => void;
};

export const Search: React.FC<Props> = ({
  setPokemon,
  setPokemonLoading,
  setPokemonError,
}) => {
  const [value, setValue] = useState("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const fetchPokemon = async (name: string) => {
    const lowerCasedRequest = name.toLowerCase();
    
    setPokemonLoading(true);
    setPokemonError(false);
    try {
      const pokemon = await getPokemon(
        `${BASE_URL}${lowerCasedRequest}`
      );
      setPokemon(pokemon);
    } catch {
      setPokemonError(true);
      setPokemon(null);
    } finally {
      setPokemonLoading(false);
    }
  };

  const handleButtonClick = () => {
    fetchPokemon(value);
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
        className="input_button"
        onClick={handleButtonClick}
        disabled={!value.length}
      >
        <Icon />
      </button>
    </div>
  );
};
