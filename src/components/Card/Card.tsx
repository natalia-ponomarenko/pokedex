import React, { useCallback, useContext, useMemo, useState } from "react";
import { Pokemon } from "../../types/Pokemon";
import { Modal } from "../Modal/Modal";
import { addDefaultSrc } from "../../utils/helperFunctions";
import { CollectionContext } from "../CollectionProvider";
import { useSpring, animated } from "react-spring";
import { TypeItem } from "../TypeItem";

type Props = {
  pokemon: Pokemon;
};

export const Card: React.FC<Props> = ({ pokemon }) => {
  const [open, setOpen] = useState(false);

  const context = useContext(CollectionContext);
  const { collection, setCollection } = context;

  const { id, name, weight, height, types, moves } = pokemon;

  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 400 },
  });

  const collected = useMemo(() => {
    return (pokemon: Pokemon) =>
      collection.some((pokemonCard: Pokemon) => pokemonCard.id === pokemon.id);
  }, [collection]);

  const isCollected = collected(pokemon);

  const addPokemon = useCallback(
    (pokemon: Pokemon) => {
      if (!isCollected) {
        setCollection((prevCollection: Pokemon[]) => [
          ...prevCollection,
          pokemon,
        ]);
      }
    },
    [setCollection, isCollected]
  );

  const removePokemon = useCallback(
    (name: string) => {
      setCollection((prevCollection: Pokemon[]) =>
        prevCollection.filter((pokemon: Pokemon) => pokemon.name !== name)
      );
    },
    [setCollection]
  );

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    pokemon: Pokemon
  ) => {
    e.stopPropagation();
    isCollected ? removePokemon(pokemon.name) : addPokemon(pokemon);
  };

  return (
    <animated.div style={styles}>
      <div className="flex flex-col m-4 justify-center">
        <div
          className={`flex flex-col w-60 bg-white p-4 rounded text-sm cursor-pointer`}
          onClick={() => setOpen(true)}
        >
          <div className="flex justify-between h-14 font-medium text-center">
            <div>
              <div>Height:</div>
              <div>{`${height / 10} m`}</div>
            </div>
            <button onClick={(e) => handleButtonClick(e, pokemon)}>
              <small
                className={`${
                  isCollected ? "opacity-0" : ""
                } transition ease-in-out delay-300 text-juicy-red`}
              >
                Catch!
              </small>
              <img
                className={`${
                  isCollected ? "opacity-0" : ""
                } h-8 transition ease-in-out delay-300`}
                src="images/pikachu.png"
                alt="pikachu"
                loading="lazy"
              />
              <img
                className={`${
                  isCollected ? "" : "opacity-0"
                } h-8 transition ease-in-out delay-300 relative bottom-8`}
                src="images/pokeball_small.png"
                alt="pokeball"
                loading="lazy"
              />
            </button>
            <div>
              <div>Weight:</div>
              <div>{`${weight / 100} kg`}</div>
            </div>
          </div>
          <div className="text-base text-center text-slate-800 font-medium capitalize py-1">
            {name}
          </div>
          <div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              onError={addDefaultSrc}
              alt={name}
              loading="lazy"
              className="w-40 h-40 object-cover mx-auto"
            />
          </div>
          <div className="flex justify-center">
            {types.map((item) => {
              const {
                type: { name },
                slot,
              } = item;
              return <TypeItem key={slot} name={name} />;
            })}
          </div>
          <div className="text-center pt-2 font-medium">{`Total moves: ${moves.length}`}</div>

          <Modal
            isModalOpen={open}
            closeModal={() => setOpen(false)}
            pokemon={pokemon}
          />
        </div>
      </div>
    </animated.div>
  );
};
