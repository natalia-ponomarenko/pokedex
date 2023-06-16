import { pokemonTypes } from "../../utils/constants";
import { PokemonType } from "../../types/PokemonTypes";

type Props = {
  name: string;
};

export const TypeItem: React.FC<Props> = ({ name }) => {
  return (
    <div
      style={{
        backgroundColor: pokemonTypes[name as PokemonType],
      }}
      className="py-1 m-1 w-16 rounded text-sm font-semibold text-white text-center"
    >
      {name}
    </div>
  );
};
