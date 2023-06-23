import { PokemonUrl } from "./Pokemon";

interface PokemonByTypeItem {
  pokemon: PokemonUrl;
  slot: number;
}

export interface PokemonsByTypeApiResponse {
  pokemon: PokemonByTypeItem[];
}
