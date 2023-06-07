import { pokemonTypes } from "../../helpers/constants";
import { PokemonType } from "../../types/PokemonTypes";

type Props = {
  name: string;
  filter?: (name: string) => void;
};

export const TypeButton: React.FC<Props> = ({ name, filter}) => {
  return (
    <button
      key={name}
      id={name}
      onClick={() => {
        if(filter) {
          filter(name)
        }
      }}
      style={{
        backgroundColor: pokemonTypes[name as PokemonType],
      }}
      className="py-1 m-1 w-16 rounded text-sm font-semibold text-white"
    >
      {name}
    </button>
  );
};
