export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeIndividual[];
  moves: PokemonMove[];
}

export interface PokemonTypeIndividual {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonMove {
  name: string;
  url: string;
}