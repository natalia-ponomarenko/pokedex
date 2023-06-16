import { PokemonUrl } from "./Pokemon";

export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonUrl[];
}
