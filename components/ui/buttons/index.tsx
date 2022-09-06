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

export function SecondaryButton({ onClick, className, text }: ButtonProps) {
  return (
    <button
      type="button"
      className={`bg-[#0062DE] no-underline text-[#D9ECFF] hover:bg-[#D9ECFF] hover:text-[#0062DE] text-center text-lg rounded-lg p-1 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export function CancelButton({ onClick, className, text }: ButtonProps) {
  return (
    <button
      type="button"
      className={`bg-[#FD1D1D] no-underline text-[#D9ECFF] hover:bg-[#d62c2c] text-center text-lg rounded-lg p-1 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}