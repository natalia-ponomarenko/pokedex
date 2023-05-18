export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeIndividual[];
}

interface PokemonTypeIndividual {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}