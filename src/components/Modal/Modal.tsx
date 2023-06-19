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
};

export const Modal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
  pokemon,
}) => {
  const { name, stats, types, height, weight, moves } = pokemon;
  const mainType = types[0].type.name;
  const mainMove = moves[0].move.name;

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child as={Fragment} {...modalBgTransitionStyles}>
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} {...modalTransitionStyles}>
              <Dialog.Panel className="w-4/5 box-border p-4 transform overflow-hidden rounded-2xl bg-white text-center align-middle shadow-xl transition-all font-poppins">
                <Dialog.Title
                  as="h1"
                  className="text-2xl font-bold leading-6 pt-6 text-slate-800 capitalize"
                >
                  {name}
                </Dialog.Title>
                <div className="my-2 flex flex-col lg:flex-row items-center justify-center">
                  <div className="w-full flex flex-col justify-center items-center">
                    <img
                      src={`https://img.pokemondb.net/sprites/home/normal/2x/${name}.jpg`}
                      // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      onError={addDefaultSrc}
                      alt={name}
                      loading="lazy"
                      className="w-full object-cover max-w-xs"
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
                        color: pokemonTypes[mainType as PokemonType],
                      }}
                    >
                      About
                    </p>
                    <div className="flex justify-between text-xs w-5/6 max-w-sm h-16 py-2">
                      <div className="flex flex-col justify-between">
                        <div className="flex items-center">
                          <img
                            src="images/straighten.png"
                            alt="weight icon"
                            className="w-6"
                          />
                          {`${height / 10} m`}
                        </div>
                        <div className="text-slate-500 text-xs">Height:</div>
                      </div>
                      <div className="relative">
                        <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-slate-300"></div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <p>{mainMove}</p>
                        <div className="text-slate-500 text-xs">
                          Total Moves: {moves.length}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-slate-300"></div>
                      </div>
                      <div className="flex flex-col justify-between">
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
                        color: pokemonTypes[mainType as PokemonType],
                      }}
                    >
                      Base Stats
                    </p>
                    <PokemonStatsChart stats={stats} />
                  </div>
                </div>
                <div className="my-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
