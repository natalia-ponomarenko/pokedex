import { Pokemon } from "../../types/Pokemon";
import { Card } from "../Card";

type Props = {
  list: Pokemon[] | undefined;
  addPokemon: (pokemon: Pokemon) => void;
  isInCollection: (pokemon: Pokemon) => boolean;
  removePokemon: (name: string) => void;
};

export const PokemonList: React.FC<Props> = ({ list, addPokemon, isInCollection, removePokemon }) => {
  return (
    <div className="flex flex-wrap justify-center py-2">
      {list?.map((pokemon: Pokemon) => (
        <Card
          key={pokemon.name}
          pokemon={pokemon}
          addPokemon={addPokemon}
          isInCollection={isInCollection}
          removePokemon={removePokemon}
        />
      ))}
    </div>
  );
};
