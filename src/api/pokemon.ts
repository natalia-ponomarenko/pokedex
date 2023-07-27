import { Pokemon } from "../types/Pokemon";
import { PokemonApiResponse } from "../types/PokemonApiResponse";
import { PokemonTypeApiResponse } from "../types/PokemonTypeApiResponse";
import { PokemonsByTypeApiResponse } from "../types/PokemonsByTypeApiResponse";
import { request } from "../utils/fetchPokemon";
import { API_URLS } from "./apiUrls";

export const getPokemons = (
  url: string
): Promise<PokemonApiResponse> => request(url);

export const getPokemonsByType = (
  url: string
): Promise<PokemonsByTypeApiResponse> => request(url);

export const getPokemon = (url: string): Promise<Pokemon> =>
  request(url);

export const getPokemonTypes =
  (): Promise<PokemonTypeApiResponse> =>
    request(API_URLS.allByType);

export const getPokemonDetails = async (
  data: PokemonApiResponse | PokemonsByTypeApiResponse
): Promise<Pokemon[]> => {
  if ("results" in data) {
    return await Promise.all(
      (data.results ?? []).map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
    );
  }

  if ("pokemon" in data) {
    return await Promise.all(
      (data.pokemon ?? []).map(async (pokemon) => {
        const response = await fetch(pokemon.pokemon.url);
        return response.json();
      })
    );
  }

  return [];
};
