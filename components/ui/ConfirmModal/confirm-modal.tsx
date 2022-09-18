import { PrimaryButton, CancelButton } from "../buttons";

import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "../Modal";

export function ConfirmModal({
  showConfirmation,
  onConfirm,
  onCancel,
  description,
  title,
}) {
  return (
    <>
      {showConfirmation && (
        <Modal open={showConfirmation}>
          <PromptForm
            onCancel={onCancel}
            onConfirm={onConfirm}
            description={description}
            title={title}
          />
        </Modal>
      )}
    </>
  );
}

function PromptForm({ onCancel, onConfirm, description, title }) {
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mx-auto rounded-md bg-white shadow-medium flex flex-col items-center pt-4 pb-6 px-4 gap-y-4">
            <div className="w-48 my-2">
              <div className="mb-6 items-center justify-center w-48 text-center">
                <div className="text-sm font-normal text-center mb-2">{title}</div>

                <div className="text-gray-400 text-sm font-normal text-center">
                  {description}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5">
                <PrimaryButton onClick={() => onConfirm()} text="Eliminar" />

                <CancelButton onClick={() => onCancel()} text="Cancelar" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
