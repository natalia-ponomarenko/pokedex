import { Statistic } from "./PokemonStats";

export interface PokemonUrl {
  name: string;
  url: string;
}

export interface PokemonTypeIndividual {
  slot: number;
  type: PokemonUrl;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeIndividual[];
  moves: PokemonUrl[];
  stats: Statistic[];
}
