import React from "react";

export const PrimaryButton = ({ onClick, text }: any) => {
  return (
    <button
      onClick={onClick}
      className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-full"
    >
      {text}
    </button>
  );
};
