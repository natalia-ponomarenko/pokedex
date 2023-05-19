import { TYPE_URL, URL10, URL_ALL } from "../helpers/constants";
import { PokemonApiResponse } from "../types/PokemonApiResponse";
import { PokemonTypeApiResponse } from "../types/PokemonTypeApiResponse";

export const request = <T>(url: string): Promise<T> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Pokemons weren't loaded");
    }

    return response.json() as Promise<T>;
  });

export const getAllPokemons = (): Promise<PokemonApiResponse> =>
  request(URL_ALL);

export const getPokemonTypes = (): Promise<PokemonTypeApiResponse> =>
  request(TYPE_URL);

export const getPokemonDetails = async (
  data: PokemonApiResponse | undefined
) => {
  if (data) {
    const pokemonList = await Promise.all(
      data.results.map(async (pokemon) => {
        return await fetch(pokemon.url).then((response) => response.json());
      })
    );

    return pokemonList;
  } else {
    return [];
  }
};
