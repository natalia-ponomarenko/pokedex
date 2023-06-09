import { PokemonTypes } from "../types/PokemonTypes";

const POKEMON_COUNT = 300;

export const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export const URL_ALL_POKEMONS = `${BASE_URL}?limit=${POKEMON_COUNT}`;

export const TYPE_URL = "https://pokeapi.co/api/v2/type/";

export const POKEMON_IMAGE_URL =
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

export const CARDS_PER_PAGE = 10;

export const POKEMON_TYPES: PokemonTypes = {
  normal: "#AAA67F",
  fire: "#EE8130",
  water: "#6493EB",
  electric: "#F9CF30",
  grass: "#74CB48",
  ice: "#9AD6DF",
  fighting: "#C12239",
  poison: "#A43E9E",
  ground: "#DEC16B",
  flying: "#A891EC",
  psychic: "#FB5584",
  bug: "#A6B91A",
  rock: "#B69E31",
  ghost: "#70559B",
  dragon: "#7037FF",
  dark: "#75574C",
  steel: "#B7B9D0",
  fairy: "#E69EAC",
  unknown: "#A3A3A3",
  shadow: "#9467B5",
};

export const DROPDOWN_TRANSITION = {
  enter: "transition ease-out duration-300",
  enterFrom: "transform opacity-0 scale-95",
  enterTo: "transform opacity-100 scale-100",
  leave: "transition ease-in duration-75",
  leaveFrom: "transform opacity-100 scale-100",
  leaveTo: "transform opacity-0 scale-95",
};

export const MODAL_BACKGROUND_TRANSITION = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

export const MODAL_TRANSITION = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95",
};
