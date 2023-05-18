import { TYPE_URL, URL10 } from "../helpers/constants";
import { PokemonApiResponse } from "../types/PokemonApiResponse";
import { PokemonType, PokemonTypeApiResponse } from "../types/PokemonTypeApiResponse";

export const request = <T>(url: string): Promise<T> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Pokemons weren't loaded");
    }

    return response.json() as Promise<T>;
  });

export const getAllPokemons = (): Promise<PokemonApiResponse> =>
    request<PokemonApiResponse>(URL10)
      .then(data => data);

export const getPokemonTypes = (): Promise<PokemonType[]> =>
  request<PokemonTypeApiResponse>(TYPE_URL)
    .then((data) => data.results)
    .catch((error) => error);

export const getPokemonDetails = async (data: PokemonApiResponse) => {
  try {
    const pokemonList = await Promise.all(
      data.results.map(async (pokemon) => {
        return await fetch(pokemon.url)
          .then(response => response.json())
          .then(data => data);
      })
    );

    return pokemonList;
  } catch (error) {
    throw new Error("Something bad has happened");
  }
};
