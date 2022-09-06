import React, { useRef } from "react";

import { motion } from "framer-motion";
import Portal from "../Portal";

export const Modal = (props: any) => {
  const modal = useRef(null);

  return (
    <Portal>
      <motion.div
        className="h-3/4 md:h-screen w-screen fixed top-0 left-0 z-50 backdrop-blur-sm flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative rounded-lg p-8 shadow xl:max-w-7xl lg:max-w-5xl md:max-w-2xl bg-white max-h-[75vh] overflow-y-auto"
          ref={modal}
          initial={{ transform: "scale(0.5)" }}
          animate={{ transform: "scale(1)" }}
          exit={{ transform: "scale(0.8)", opacity: 0 }}
        >
          {props.children}
        </motion.div>
      </motion.div>
    </Portal>
  );
};
