import { TYPE_URL } from "../helpers/constants";
import { Pokemon } from "../types/Pokemon";
import { PokemonApiResponse } from "../types/PokemonApiResponse";
import { PokemonTypeApiResponse } from "../types/PokemonTypeApiResponse";
import { request } from "../utils/fetchPokemon";

export const getPokemons = (url: string): Promise<PokemonApiResponse | undefined> =>
  request(url);

export const getPokemonTypes = (): Promise<PokemonTypeApiResponse> =>
  request(TYPE_URL);

export const getPokemonDetails = async (data: PokemonApiResponse | undefined): Promise<Pokemon[]> => {
  if (data) {
    const pokemonList = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      })
    );

    return pokemonList;
  } else {
    return [];
  }
};
