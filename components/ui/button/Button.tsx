import React from "react";
import { ButtonProps } from "lib/types";

export function Button({ onClick, className, children }: ButtonProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
