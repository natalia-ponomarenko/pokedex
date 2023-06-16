import { TYPE_URL } from "../utils/constants";
import { Pokemon } from "../types/Pokemon";
import { PokemonApiResponse } from "../types/PokemonApiResponse";
import { PokemonTypeApiResponse } from "../types/PokemonTypeApiResponse";
import { PokemonsByTypeApiResponse } from "../types/PokemonsByTypeApiResponse";
import { request } from "../utils/fetchPokemon";

export const getPokemons = (url: string): Promise<PokemonApiResponse> =>
  request(url);

export const getPokemonsByType = (
  url: string
): Promise<PokemonsByTypeApiResponse> => request(url);

export const getPokemonDetails = async (
  data: PokemonApiResponse | PokemonsByTypeApiResponse
): Promise<Pokemon[]> => {
  let pokemonList: Pokemon[] = [];

  if ("results" in data) {
    pokemonList = await Promise.all(
      (data.results ?? []).map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      })
    );
  } else if ("pokemon" in data) {
    pokemonList = await Promise.all(
      (data.pokemon ?? []).map(async (pokemon) => {
        const response = await fetch(pokemon.pokemon.url);
        return await response.json();
      })
    );
  }

  return pokemonList;
};

export const getPokemonTypes = (): Promise<PokemonTypeApiResponse> =>
  request(TYPE_URL);
