import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-primary w-[99%] h-16  rounded-full my-2">
      <h1
        className="absolute p-4 cursor-pointer text-xl font-bold text-accent z-20"
        onClick={() => navigate("/")}
      >
        Buying tickets
      </h1>
      <ul
        className={`flex justify-center mx-auto relative p-4 [&>*]:mx-2 [&>*]:text-quaternary hover:[&>*]:text-primary hover:[&>*]:bg-quaternary  max-xl:bg-white max-xl:flex-col max-xl:mt-[4.5rem] max-xl:text-center rounded-b-lg max-xl:z-10 list-outside [&>*]:max-xl:m-4 ${
          menuOpen ? "" : "max-xl:hidden"
        }`}
      >
        <li
          className="cursor-pointer rounded-lg px-3 py-1"
          onClick={() => {
            setMenuOpen(false);
            navigate("/trending-movies");
          }}
        >
          Trending movies
        </li>
      </ul>
    </div>
  );
};
