import { Pokemon } from "../../types/Pokemon";
import { Card } from "../Card";

type Props = {
  list: Pokemon[] | undefined;
};

export const PokemonList: React.FC<Props> = ({ list }) => {
  return (
    <div className="flex flex-wrap justify-center py-2">
      {list?.map((pokemon: Pokemon) => (
        <Card
          key={pokemon.name}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
};
