import { POKEMON_TYPES } from "../../../utils/constants";
import { PokemonType } from "../../../types/PokemonTypes";
import { useState } from "react";
import classnames from "classnames";
import { updateURLParams } from "../../../utils/helperFunctions";

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
        updateURLParams();
      }}
      style={{
        backgroundColor: POKEMON_TYPES[name as PokemonType],
      }}
      className={classnames("type-button", {
        "focus:ring-2": active === name,
        "focus:ring-juicy-red": active === name,
      })}>
      {name}
    </button>
  );
};
