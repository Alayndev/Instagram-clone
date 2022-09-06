import React from "react";

export function Title({ className, text }: any) {
  return (
    <h1 className={`${className}`}>
      {text}
    </h1>
  );
}
