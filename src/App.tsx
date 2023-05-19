import React from "react";
import { getAllPokemons, getPokemonDetails } from "./api/pokemon";
import { PokemonApiResponse } from "./types/PokemonApiResponse";
import { TypesList } from "./components/TypesList";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "./components/Loader";

const App: React.FC = () => {
  const { data, status } = useQuery<PokemonApiResponse>({
    queryKey: ["pokemonList"],
    queryFn: getAllPokemons,
  });

  const { data: pokemonList, status: pokemonListStatus } = useQuery({
    queryKey: ["pokemonDetails"],
    queryFn: () => getPokemonDetails(data),
    enabled: status === "success",
  });

  return (
    <>
      <h1 className="text-red-500 text-3xl font-bold underline">
        This is Pokedex!
      </h1>
      {status === "loading" && pokemonListStatus === "loading" && <Loader />}
      {status === "success" && pokemonListStatus === "success" && (
        <div>
          {pokemonList?.map(({ name }) => (
            <p>{name}</p>
          ))}
        </div>
      )}
      {(status === "error" || pokemonListStatus === "error") && (
        <p>Pokemons weren't fetched</p>
      )}
      <TypesList />
    </>
  );
};

export default App;
