import { SelectOption } from "../types/SelectOption";

export const URL10 = "https://pokeapi.co/api/v2/pokemon/?limit=10";

export const URL20 = "https://pokeapi.co/api/v2/pokemon/?limit=20";

export const URL50 = "https://pokeapi.co/api/v2/pokemon/?limit=50";

export const URL_ALL = "https://pokeapi.co/api/v2/pokemon/?limit=1118";

export const TYPE_URL = "https://pokeapi.co/api/v2/type/";


export const options: SelectOption[] = [
  { value: URL10, label: "10" },
  { value: URL20, label: "20" },
  { value: URL50, label: "50" },
  { value: URL_ALL, label: "all" },
];

export const pokemonTypes = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  unknown: '#F3FF89',
  shadow: '#9467B5'
}
