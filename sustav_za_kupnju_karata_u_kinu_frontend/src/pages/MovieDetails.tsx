import React from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { NavLink } from "react-router-dom";

export const MovieDetails = () => {
  return (
    <div className="bg-secondary rounded-2xl text-primary-dark p-4">
      MovieDetails
      <div>ime</div>
      <div>opis</div>
      <div>trajanje</div>
      <div>Original name</div>
      <div>Genre</div>
      <div>Godina</div>
      <div>Zemlja</div>
      <NavLink to={"/select-seats"}>
        <PrimaryButton text="Buy ticket" onClick={() => {}} />
      </NavLink>
    </div>
  );
};
