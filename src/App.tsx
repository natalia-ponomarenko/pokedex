import React, {
  useEffect,
  useState,
} from "react";
import {
  getAllPokemons,
  getPokemonDetails,
  getPokemonTypes,
} from "./api/pokemon";
import { PokemonApiResponse } from "./types/PokemonApiResponse";
import { Pokemon } from "./types/Pokemon";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: PokemonApiResponse =
          await getAllPokemons();
        const pokemonList =
          await getPokemonDetails(data);
        setPokemons(pokemonList? pokemonList : []);
        const types = await getPokemonTypes();
        console.log(types)
      } catch (error) {
        throw new Error('Something went wrong and Pokemos were loaded')
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-red-500 text-3xl font-bold underline">
        This is Pokedex!
      </h1>
      <div>
        {pokemons.length && (
          pokemons.map(({name}) => <p>{name}</p>)
        )}

      </div>
    </>
  );
};

export default App;
