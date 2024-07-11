import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-auto bg-primary-dark w-full p-7 flex justify-center items-center text-quaternary-light">
      &#169; {new Date().getFullYear()} System for buying tickets.
    </footer>
  );
};
