import { useState } from "react";
import { pokemonTypes } from "../../helpers/constants";
import { PokemonType } from "../../types/PokemonTypes";
import { Pokemon } from "../../types/Pokemon";
import { Modal } from "../Modal/Modal";
import { addDefaultSrc } from "../../helpers/helperFunctions";

type Props = {
  pokemon: Pokemon;
};

export const Card: React.FC<Props> = ({ pokemon }) => {
  const [open, setOpen] = useState(false);

  const {
    id,
    name,
    weight,
    height,
    types,
    moves
  } = pokemon;
  return (
    <div
      className="flex flex-col w-52 m-4 bg-white p-6 rounded text-sm"
      onClick={() => setOpen(true)}
    >
      <div>
        <div className="flex justify-between">
          <div>
            <div>Height:</div>
            <div>{`${height / 10} m`}</div>
          </div>
          <div>
            <div>Weight:</div>
            <div>{`${weight / 100} kg`}</div>
          </div>
        </div>
        <div
          className="text-lg text-center text-slate-800 font-medium capitalize py-1"
        >{`${name}`}</div>
        <div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            onError={addDefaultSrc}
            alt={name}
            className="w-40 h-40 object-cover"
          />
        </div>
        <div className="flex">
          {types.map((type) => (
            <div
              key={type.slot}
              className="flex w-min px-4 py-1 rounded m-1 font-medium"
              style={{
                backgroundColor: pokemonTypes[type.type.name as PokemonType],
              }}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <div>{`Total moves: ${moves.length}`}</div>
      </div>
      <Modal
        isModalOpen={open}
        closeModal={() => setOpen(false)}
        pokemon={pokemon}
      />
    </div>
  );
};
