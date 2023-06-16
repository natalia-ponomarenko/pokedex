export interface PokemonTypeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonType[];
}

interface PokemonType {
  name: string;
  url: string;
}
