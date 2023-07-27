import { POKEMON_COUNT } from "../utils/constants";

export const BASE_API_URL = "https://pokeapi.co/api/v2";

export const API_URLS = {
  get allPokemons() {
    return `${BASE_API_URL}/pokemon?limit=${POKEMON_COUNT}`;
  },

  get pokemon() {
    return `${BASE_API_URL}/pokemon/`;
  },

  get allByType() {
    return `${BASE_API_URL}/type/`;
  },

  get pokemonImage() {
    return "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
  },
};
