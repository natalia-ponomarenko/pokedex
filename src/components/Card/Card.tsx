import React, { useCallback, useContext, useMemo, useState } from "react";
import { Pokemon } from "../../types/Pokemon";
import { Modal } from "../Modal/Modal";
import { addDefaultSrc } from "../../utils/helperFunctions";
import { CollectionContext } from "../CollectionProvider";
import { useSpring, animated } from "react-spring";
import { pokemonTypes } from "../../utils/constants";
import { PokemonType } from "../../types/PokemonTypes";

type Props = {
  pokemon: Pokemon;
};

export const Card: React.FC<Props> = ({ pokemon }) => {
  const [open, setOpen] = useState(false);

  const context = useContext(CollectionContext);
  const { collection, setCollection } = context;

  const { name, types } = pokemon;
  const mainType = types[0].type.name;

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
      <div className="flex flex-col m-4 justify-center font-semibold font-poppins">
        <div
          className={`flex flex-col w-60 shadow-md bg-white rounded-lg text-sm cursor-pointer relative`}
          onClick={() => setOpen(true)}
        >
          <div className="h-16 py-2 px-4">
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
          </div>

          <img
            src={`https://img.pokemondb.net/sprites/home/normal/2x/${name}.jpg`}
            // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            onError={addDefaultSrc}
            alt={name}
            loading="lazy"
            className="w-4/5 object-cover mx-auto z-10"
          />
          <div
            style={{
              backgroundColor: pokemonTypes[mainType as PokemonType],
            }}
            className="w-full rounded-lg py-1"
          >
            <p className="text-lg text-white text-center font-600 capitalize">
              {name}
            </p>
          </div>
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
