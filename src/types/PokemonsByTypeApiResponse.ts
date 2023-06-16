import { PokemonUrl } from "./Pokemon";

// interface DamageRelations {
//   double_damage_from: PokemonUrl[];
//   double_damage_to: PokemonUrl[];
//   half_damage_from: PokemonUrl[];
//   half_damage_to: PokemonUrl[];
//   no_damage_from: PokemonUrl[];
//   no_damage_to: PokemonUrl[];
// }

// interface GameIndices {
//   game_index: number;
//   generation: PokemonUrl;
// }

// interface Names {
//   language: PokemonUrl[];
//   name: string;
// }

// interface PastDamageRelations {
//   damage_relations: DamageRelations;
//   generation: PokemonUrl;
// }

interface PokemonByTypeItem {
  pokemon: PokemonUrl;
  slot: number
}

export interface PokemonsByTypeApiResponse {
  // damage_relations: DamageRelations;
  // game_indices: GameIndices[];
  // generation: PokemonUrl;
  // id: number;
  // move_damage_class: PokemonUrl | null;
  // moves: PokemonUrl[] | [];
  // name: string;
  // names: Names[];
  // past_damage_relations: PastDamageRelations | [];
  pokemon: PokemonByTypeItem[]
}
