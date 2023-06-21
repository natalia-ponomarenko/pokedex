import { pokemonTypes } from "../../../utils/constants";
import { PokemonType } from "../../../types/PokemonTypes";
import { useState } from "react";

type Props = {
  name: string;
  setFilter: (filter: string) => void;
};

export const TypeButton: React.FC<Props> = ({ name, setFilter }) => {
  const [active, setActive] = useState<string>("");

  return (
    <button
      key={name}
      id={name}
      onClick={() => {
        setActive(name);
        setFilter(name);
      }}
      style={{
        backgroundColor: pokemonTypes[name as PokemonType],
      }}
      className={`py-1 m-1 w-16 rounded text-sm font-semibold text-white ring-transparent ${
        active === name ? "focus: ring-2 focus:ring-juicy-red" : ""
      }`}
    >
      {name}
    </button>
  );
};
