import React from "react";
import { InputProps } from "lib/types";

export const Input = (props: InputProps) => {
  return (
    <span className="relative">
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        className={`peer p-1 h-10 w-full border-0 border-b text-gray-900 placeholder-transparent focus:outline-none  focus:ring-0 ${
          props.error
            ? "border-red-300 focus:border-red-500"
            : "border-gray-novateva focus:border-blue-maker"
        } `}
        placeholder="john@doe.com"
        {...props.register(props.id)}
      />
      <label
        htmlFor={props.name}
        className={`absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base  peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm transform duration-500 ${
          props.error
            ? "text-red-300 peer-placeholder-shown:text-red-400 peer-focus:text-red-600"
            : "text-gray-700 peer-placeholder-shown:text-gray-700 peer-focus:text-gray-800"
        }`}
      >
        {props.label}
      </label>
    </span>
  );
};
