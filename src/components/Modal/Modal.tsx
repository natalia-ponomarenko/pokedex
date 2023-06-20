import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addDefaultSrc } from "../../utils/helperFunctions";
import { PokemonStatsChart } from "../Stats";
import { Pokemon } from "../../types/Pokemon";
import { TypeItem } from "../TypeItem";
import {
  modalBgTransitionStyles,
  modalTransitionStyles,
  pokemonTypes,
} from "../../utils/constants";
import { PokemonType } from "../../types/PokemonTypes";

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
  const mainType = types[0].type.name;
  const mainMove = moves[0].move.name;
  const pokemonMainTypeColor = pokemonTypes[mainType as PokemonType];

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child as={Fragment} {...modalBgTransitionStyles}>
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} {...modalTransitionStyles}>
              <Dialog.Panel className="w-full md:max-w-md box-border p-4 transform overflow-hidden rounded-2xl bg-white text-center align-middle shadow-xl transition-all font-poppins">
                <div className="flex items-center py-4 text-2xl">
                  <i className="fa-solid fa-arrow-left p-1" onClick={closeModal}></i>
                <Dialog.Title
                  as="h1"
                  className="font-bold leading-6 text-slate-800 capitalize w-full pr-8"
                >
                  {name}
                </Dialog.Title>
                </div>
                <div className="my-2 flex flex-col items-center justify-center">
                  <div className="w-full flex flex-col justify-center items-center">
                    <img
                      src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`}
                      onError={addDefaultSrc}
                      alt={name}
                      loading="lazy"
                      className="w-full object-cover max-w-[250px]"
                    />
                    <div className="flex justify-center">
                      {types.map((item) => {
                        const {
                          type: { name },
                          slot,
                        } = item;
                        return <TypeItem key={slot} name={name} />;
                      })}
                    </div>
                    <p
                      className="text-xl"
                      style={{
                        color: pokemonMainTypeColor,
                      }}
                    >
                      About
                    </p>
                    <div className="flex justify-between text-xs w-5/6 max-w-sm h-16 py-2">
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center">
                          <img
                            src="images/straighten.png"
                            alt="weight icon"
                            className="w-6 h-5"
                          />
                          {`${height / 10} m`}
                        </div>
                        <div className="text-slate-500 text-xs">Height:</div>
                      </div>
                      <div className="relative">
                        <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-slate-300"></div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p>{mainMove}</p>
                        <div className="text-slate-500 text-xs">
                          Total Moves: {moves.length}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-slate-300"></div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center">
                          <img
                            src="images/weight.png"
                            alt="weight icon"
                            className="w-6 h-5"
                          />
                          {`${weight / 100} kg`}
                        </div>
                        <div className="text-slate-500 text-xs">Weight:</div>
                        <div className="relative">
                          <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-slate-300"></div>
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
                    <PokemonStatsChart stats={stats} color={pokemonMainTypeColor} />
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
