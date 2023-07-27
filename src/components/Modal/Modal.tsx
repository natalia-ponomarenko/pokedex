import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  MODAL_BACKGROUND_TRANSITION,
  MODAL_TRANSITION,
} from "../../utils/constants";

type ModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  children,
}) => {
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
    <Transition
      appear
      show={isModalOpen}
      as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          {...MODAL_BACKGROUND_TRANSITION}>
          <div className="modal-background" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              {...MODAL_TRANSITION}>
              <Dialog.Panel className="modal-panel-custom modal-panel">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
