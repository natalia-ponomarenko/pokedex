import React, { useCallback, useContext, useEffect, useState } from "react";
import { Pokemon } from "../../types/Pokemon";
import { Modal } from "../Modal/Modal";
import { addDefaultSrc, convertPokemonId } from "../../utils/helperFunctions";
import { CollectionContext } from "../CollectionProvider";
import { useSpring, animated } from "react-spring";
import { PokemonType } from "../../types/PokemonTypes";
import classnames from "classnames";
import { API_URLS } from "../../api/apiUrls";
import { POKEMON_TYPES } from "../../utils/constants";
import { PokemonInfoModal } from "../PokemonInfoModal/PokemonInfoModal";

type Props = {
  pokemon: Pokemon;
};

export const Card: React.FC<Props> = ({ pokemon }) => {
  const [open, setOpen] = useState(false);

  const context = useContext(CollectionContext);
  const { collection, setCollection } = context;

  const { name, types, id } = pokemon;
  const mainType = types && types.length > 0 ? types[0].type.name : "unknown";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (open) {
      params.set("pokemonId", String(id));
    } else {
      params.delete("pokemonId");
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [open, id]);

  useEffect(() => {
    localStorage.setItem("pokemonCollection", JSON.stringify(collection));
  }, [collection]);

  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 400 },
  });

  const isCollected = useCallback(
    (pokemon: Pokemon) => {
      return collection.some(
        (pokemonCard: Pokemon) => pokemonCard.id === pokemon.id
      );
    },
    [collection]
  );

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    pokemon: Pokemon
  ) => {
    e.stopPropagation();

    if (isCollected(pokemon)) {
      removePokemon(pokemon.id);
    } else {
      addPokemon(pokemon);
    }
  };

  const addPokemon = useCallback(
    (pokemon: Pokemon) => {
      if (!isCollected(pokemon)) {
        setCollection([...collection, pokemon]);
      }
    },
    [setCollection, isCollected, collection]
  );

  const removePokemon = useCallback(
    (id: number) => {
      setCollection(collection.filter((pokemon: Pokemon) => pokemon.id !== id));
    },
    [setCollection, collection]
  );

  const convertedPokemonId = convertPokemonId(id);

  return (
    <animated.div style={styles}>
      <div className="flex flex-col m-4 font-semibold hover:shadow-lg hover:-translate-y-1 hover:duration-300">
        <div
          className="card"
          onClick={() => setOpen(true)}>
          <div className="h-16 py-4 px-4 flex justify-between">
            <button onClick={(e) => handleButtonClick(e, pokemon)}>
              <img
                className={classnames(
                  {
                    "opacity-0": isCollected(pokemon),
                  },
                  "collected-image"
                )}
                src="images/pokeball_open.png"
                alt="pokeball open"
                loading="lazy"
              />
              <img
                className={classnames(
                  {
                    "opacity-0": !isCollected(pokemon),
                  },
                  "collected-image",
                  "relative",
                  "bottom-8"
                )}
                src="images/pokeball_small.png"
                alt="pokeball closed"
                loading="lazy"
              />
            </button>
            <p className="text-lg py-1">{`#${convertedPokemonId}`}</p>
          </div>

          <div className="relative h-full flex justify-center">
            <div className="w-24 absolute right-2 z-10">
              <img
                src="images/pokeball_background.png"
                alt="pokeball white"
              />
            </div>
            <img
              src={`${API_URLS.pokemonImage}${convertedPokemonId}.png`}
              onError={addDefaultSrc}
              alt={name}
              loading="lazy"
              className="w-4/5 object-cover z-20 absolute top-0"
            />
          </div>
          <div
            style={{
              backgroundColor: POKEMON_TYPES[mainType as PokemonType],
            }}
            className="w-full rounded-lg py-2 absolute bottom-0">
            <p className="card-name">{name}</p>
          </div>
          <Modal
            isModalOpen={open}
            closeModal={() => setOpen(false)}>
            <PokemonInfoModal
              pokemon={pokemon}
              closeModal={() => setOpen(false)}
              pokemonId={convertedPokemonId}
            />
          </Modal>
        </div>
      </div>
    </animated.div>
  );
};
