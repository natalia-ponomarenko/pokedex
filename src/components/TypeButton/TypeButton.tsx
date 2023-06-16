import { pokemonTypes } from "../../utils/constants";
import { PokemonType } from "../../types/PokemonTypes";

type Props = {
  name: string;
  setFilter: (filter: string) => void;
};

export const TypeButton: React.FC<Props> = ({ name, setFilter }) => {
  return (
    <button
      key={name}
      id={name}
      onClick={() => setFilter(name)}
      style={{
        backgroundColor: pokemonTypes[name as PokemonType],
      }}
      className="py-1 m-1 w-16 rounded text-sm font-semibold text-white"
    >
      {name}
    </button>
  );
};
