import React from "react";
import { ButtonProps } from "lib/types";

export function PrimaryButton({ onClick, className, text }: ButtonProps) {
  return (
    <button
      type="button"
      className={`bg-[#D9ECFF] no-underline text-[#0062DE] hover:bg-[#0062DE] hover:text-[#D9ECFF] text-center text-lg rounded-lg p-1 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
