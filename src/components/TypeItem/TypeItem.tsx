import { POKEMON_TYPES } from "../../utils/constants";
import { PokemonType } from "../../types/PokemonTypes";

type Props = {
  name: string;
};

export const TypeItem: React.FC<Props> = ({ name }) => {
  return (
    <div
      style={{
        backgroundColor: POKEMON_TYPES[name as PokemonType],
      }}
      className="type_item"
    >
      {name}
    </div>
  );
};
