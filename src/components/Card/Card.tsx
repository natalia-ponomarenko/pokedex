import React, { useCallback, useContext, useMemo, useState } from "react";
import { Pokemon } from "../../types/Pokemon";
import { Modal } from "../Modal/Modal";
import { addDefaultSrc, convertPokemonId } from "../../utils/helperFunctions";
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

  const { name, types, id } = pokemon;
  const mainType = types && types.length > 0 ? types[0].type.name : 'unknown';

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

  const convertedPokemonId = convertPokemonId(id);

  return (
    <animated.div style={styles}>
      <div className="flex flex-col m-4 font-semibold">
        <div
          className={`flex flex-col w-60 h-72 shadow-md bg-white rounded-lg text-sm cursor-pointer relative`}
          onClick={() => setOpen(true)}
        >
          <div className="h-16 py-4 px-4 flex justify-between">
            <button onClick={(e) => handleButtonClick(e, pokemon)}>
              <img
                className={`${
                  isCollected ? "opacity-0" : ""
                } h-8 transition ease-in-out delay-300`}
                src="images/pokeball_open.png"
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
            <p className="text-lg py-1">{`#${convertedPokemonId}`}</p>
          </div>

          <div className="relative h-full flex justify-center">
            <div className="w-24 absolute right-2 z-10">
              <img src="images/pokeball_background.png" alt="pokeball white" />
            </div>
            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${convertedPokemonId}.png`}
              onError={addDefaultSrc}
              alt={name}
              loading="lazy"
              className="w-4/5 object-cover z-20 absolute top-0"
            />
          </div>
          <div
            style={{
              backgroundColor: pokemonTypes[mainType as PokemonType],
            }}
            className="w-full rounded-lg py-2 absolute bottom-0"
          >
            <p className="text-lg text-white text-center font-600 capitalize">
              {name}
            </p>
          </div>
          <Modal
            isModalOpen={open}
            closeModal={() => setOpen(false)}
            pokemon={pokemon}
            pokemonId={convertedPokemonId}
          />
        </div>
      </div>
    </animated.div>
  );
};
