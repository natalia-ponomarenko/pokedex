import { Pokemon } from "../../types/Pokemon";
import { Card } from "../Card";

type Props = {
  list: Pokemon[] | undefined;
};

export const PokemonList: React.FC<Props> = ({ list }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {list?.map((pokemon: Pokemon) => (
        <Card key={pokemon.name} {...pokemon} />
      ))}
    </div>
  );
};
