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
  moves: PokemonMoves[];
  stats: Statistic[];
}

export interface PokemonMoves {
  move: { name: string; url: string };
  version_group_details: [
    {
      level_learned_at: number;
      move_learn_method: PokemonTypeIndividual;
      version_group: PokemonTypeIndividual;
    }
  ];
}
