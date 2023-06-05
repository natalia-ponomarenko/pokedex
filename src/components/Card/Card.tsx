import { useCallback, useContext, useMemo, useState } from "react";
import { pokemonTypes } from "../../helpers/constants";
import { PokemonType } from "../../types/PokemonTypes";
import { Pokemon } from "../../types/Pokemon";
import { Modal } from "../Modal/Modal";
import { addDefaultSrc } from "../../helpers/helperFunctions";
import { CollectionContext } from "../CollectionProvider";

type Props = {
  pokemon: Pokemon;
};

export const Card: React.FC<Props> = ({ pokemon }) => {
  const [open, setOpen] = useState(false);

  const context = useContext(CollectionContext);
  const { collection, setCollection } = context;

  const collected = useMemo(() => {
    return (pokemon: Pokemon) =>
      collection.some((pokemonCard: Pokemon) => pokemonCard.id === pokemon.id);
  }, [collection]);

  const addPokemon = useCallback(
    (pokemon: Pokemon) => {
      if (!collected(pokemon)) {
        setCollection((prevCollection: Pokemon[]) => [
          ...prevCollection,
          pokemon,
        ]);
      }
    },
    [setCollection, collected]
  );

  const removePokemon = useCallback(
    (name: string) => {
      setCollection((prevCollection: Pokemon[]) =>
        prevCollection.filter((pokemon: Pokemon) => pokemon.name !== name)
      );
    },
    [setCollection]
  );

  const { id, name, weight, height, types, moves } = pokemon;
  return (
    <div className="flex flex-col m-4">
      <button
        className="bg-white rounded w-16 pt-2 flex justify-center items-center"
        onClick={() =>
          collected(pokemon) ? removePokemon(pokemon.name) : addPokemon(pokemon)
        }
      >
        <img
          className="h-8"
          src={`images/${
            collected(pokemon) ? "pikachu" : "pokeball_small"
          }.png`}
          alt="pokeball"
        />
      </button>
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
          <div className="text-lg text-center text-slate-800 font-medium capitalize py-1">
            {name}
          </div>
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
