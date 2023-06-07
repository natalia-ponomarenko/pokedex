import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addDefaultSrc } from "../../helpers/helperFunctions";
import { Statistic } from "../../types/PokemonStats";
import { Pokemon } from "../../types/Pokemon";
import { PokemonStatsChart } from "../Stats";

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
  const { name, id, stats } = pokemon;
  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[360px] box-border transform overflow-hidden rounded-2xl bg-white p-2 text-center align-middle shadow-xl transition-all ml-screen-offset">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-slate-800 capitalize"
                >
                  {name}
                </Dialog.Title>
                <div className="my-2 flex flex-col items-center justify-center">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    onError={addDefaultSrc}
                    alt={name}
                    className="w-40 h-40 object-cover"
                  />
                  <PokemonStatsChart stats={stats} />
                </div>

                <div className="mt-4">
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
