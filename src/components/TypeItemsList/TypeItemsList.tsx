import React from "react";
import { PokemonTypeIndividual } from "../../types/Pokemon";
import { TypeItem } from "../TypeItem";

type Props = {
  types: PokemonTypeIndividual[];
};

export const TypeItemsList: React.FC<Props> = ({
  types,
}) => {
  return (
    <>
      {types.map((item) => {
        const { type: { name }, slot } = item;
        return (
          <TypeItem
            key={slot}
            name={name}
          />
        );
      })}
    </>
  );
};
