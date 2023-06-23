import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addDefaultSrc } from "../../utils/helperFunctions";
import { PokemonStatsChart } from "../Stats";
import { Pokemon } from "../../types/Pokemon";
import {
  MODAL_BACKGROUND_TRANSITION,
  MODAL_TRANSITION,
  POKEMON_IMAGE_URL,
  POKEMON_TYPES,
} from "../../utils/constants";
import { PokemonType } from "../../types/PokemonTypes";
import { TypeItemsList } from "../TypeItemsList";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  pokemon: Pokemon;
  pokemonId: string;
};

export const Modal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
  pokemon,
  pokemonId,
}) => {
  const { name, stats, types, height, weight, moves } = pokemon;
  const mainType = types ? types[0].type.name : "unknown";
  const pokemonMainTypeColor = POKEMON_TYPES[mainType as PokemonType];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modalPanel = document.querySelector(".modal-panel");
      if (modalPanel && !modalPanel.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen, closeModal]);

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child as={Fragment} {...MODAL_BACKGROUND_TRANSITION}>
          <div className="modal_background" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex-center min-h-full p-4 text-center">
            <Transition.Child as={Fragment} {...MODAL_TRANSITION}>
              <Dialog.Panel className="modal_panel modal-panel">
                <div className="flex items-center py-2 text-2xl">
                  <i
                    className="fa-solid fa-arrow-left p-1"
                    onClick={closeModal}
                  ></i>
                  <Dialog.Title as="h1" className="modal_name">
                    {name}
                  </Dialog.Title>
                </div>
                <div className="my-2 flex-center flex-col">
                  <div className="w-full flex-center flex-col">
                    <img
                      src={`${POKEMON_IMAGE_URL}${pokemonId}.png`}
                      onError={addDefaultSrc}
                      alt={name}
                      loading="lazy"
                      className="w-full object-cover max-w-[200px]"
                    />
                    <div className="flex justify-center">
                      <TypeItemsList types={types} />
                    </div>
                    <p
                      className="text-xl pt-2"
                      style={{
                        color: pokemonMainTypeColor,
                      }}
                    >
                      About
                    </p>
                    <div className="modal_main_stats">
                      <div className="flex-column-centered">
                        <div className="flex items-center">
                          <img
                            src="images/straighten.png"
                            alt="weight icon"
                            className="w-6 h-5"
                          />
                          {`${height / 10} m`}
                        </div>
                        <div className="small_header">Height:</div>
                      </div>
                      <div className="relative">
                        <div className="stats_modal" />
                      </div>
                      <div className="flex-column-centered">
                        <div className="small_header pt-1">
                          <i className="fa-solid fa-bolt pr-1 text-black" />
                          Total Moves:{" "}
                          <span className="text-black">{moves.length}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="stats_modal" />
                      </div>
                      <div className="flex-column-centered">
                        <div className="flex items-center">
                          <img
                            src="images/weight.png"
                            alt="weight icon"
                            className="w-6 h-5"
                          />
                          {`${weight / 10} kg`}
                        </div>
                        <div className="small_header">Weight:</div>
                        <div className="relative">
                          <div className="stats_modal" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <p
                      className="text-xl"
                      style={{
                        color: pokemonMainTypeColor,
                      }}
                    >
                      Base Stats
                    </p>
                    <PokemonStatsChart
                      stats={stats}
                      color={pokemonMainTypeColor}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
