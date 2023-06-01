import { useState } from "react";
import { pokemonTypes } from "../../helpers/constants";
import { PokemonType } from "../../types/PokemonTypes";
import { Pokemon } from "../../types/Pokemon";
import { Modal } from "../Modal/Modal";
import { addDefaultSrc } from "../../helpers/helperFunctions";

type Props = {
  pokemon: Pokemon;
  addPokemon: (pokemon: Pokemon) => void;
  isInCollection: (pokemon: Pokemon) => boolean;
  removePokemon: (name: string) => void;
};

export const Card: React.FC<Props> = ({
  pokemon,
  addPokemon,
  isInCollection,
  removePokemon,
}) => {
  const [open, setOpen] = useState(false);

  const { id, name, weight, height, types, moves } = pokemon;

  const collected = isInCollection(pokemon);
  console.log('card render')
  return (
    <div className="flex flex-col m-4">
      <div className="bg-white rounded w-16 p-1 text-center">
          <button onClick={() =>
            collected ? removePokemon(pokemon.name) : addPokemon(pokemon)
          }>
            <img
              className="h-8"
              src={`/images/${collected ? 'pikachu' : 'pokeball_small'}.png`}
              alt="pokeball"
            />
          </button>
      </div>
      <div
        className={`flex flex-col w-52 bg-white p-6 rounded text-sm`}
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
          <div className="text-lg text-center text-slate-800 font-medium capitalize py-1">{`${name}`}</div>
          <div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              onError={addDefaultSrc}
              alt={name}
              className="w-40 h-40 object-cover"
            />
          </div>
          <div className="flex">
            {types.map((item) => {
              const { type, slot } = item;
              return (
                <div
                  key={slot}
                  className="flex w-min px-4 py-1 rounded m-1 font-medium"
                  style={{
                    backgroundColor: pokemonTypes[type.name as PokemonType],
                  }}
                >
                  {type.name}
                </div>
              );
            })}
          </div>
          <div>{`Total moves: ${moves.length}`}</div>
        </div>
        <Modal
          isModalOpen={open}
          closeModal={() => setOpen(false)}
          pokemon={pokemon}
        />
      </div>
    </div>
  );
};
