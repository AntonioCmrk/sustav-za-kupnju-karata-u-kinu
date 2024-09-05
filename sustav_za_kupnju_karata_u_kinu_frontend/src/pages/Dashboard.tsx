import React, { useState } from "react";
import { ChechUserReservations } from "../components/ChechUserReservations";
import { CreateCinema } from "../components/CreateCinema";
import { AddMovie } from "../components/AddMovie";
import { AddProjection } from "../components/AddProjection ";

export const Dashboard: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<string>("reservations");

  return (
    <div className=" min-h-screen min-w-[600px] p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary-dark mb-6">Dashboard</h1>

      <div className="relative flex justify-center mb-8">
        <div className="bg-primary-dark rounded-full flex p-1 w-full max-w-xl justify-between relative">
          <label className="relative flex-1 text-center cursor-pointer z-10 flex justify-center items-center">
            <input
              type="radio"
              name="component"
              value="reservations"
              checked={selectedComponent === "reservations"}
              onChange={(e) => setSelectedComponent(e.target.value)}
              className="sr-only"
            />
            <span
              className={`block px-4 py-2 rounded-full font-bold text-lg text-white transition-colors duration-300`}
            >
              Check Reservations
            </span>
          </label>

          <label className="relative flex-1 text-center cursor-pointer z-10 flex justify-center items-center">
            <input
              type="radio"
              name="component"
              value="cinema"
              checked={selectedComponent === "cinema"}
              onChange={(e) => setSelectedComponent(e.target.value)}
              className="sr-only"
            />
            <span
              className={`block px-4 py-2 rounded-full font-bold text-lg text-white transition-colors duration-300`}
            >
              Create Cinema
            </span>
          </label>

          <label className="relative flex-1 text-center cursor-pointer z-10 flex justify-center items-center">
            <input
              type="radio"
              name="component"
              value="movie"
              checked={selectedComponent === "movie"}
              onChange={(e) => setSelectedComponent(e.target.value)}
              className="sr-only"
            />
            <span
              className={`block px-4 py-2 rounded-full font-bold text-lg text-white transition-colors duration-300`}
            >
              Add Movie
            </span>
          </label>

          <label className="relative flex-1 text-center cursor-pointer z-10 flex justify-center items-center">
            <input
              type="radio"
              name="component"
              value="projection"
              checked={selectedComponent === "projection"}
              onChange={(e) => setSelectedComponent(e.target.value)}
              className="sr-only"
            />
            <span
              className={`block px-4 py-2 rounded-full font-bold text-lg text-white transition-colors duration-300`}
            >
              Add Projection
            </span>
          </label>

          <span
            className={`absolute top-0 left-0 w-1/4 h-full bg-accent rounded-full transform transition-transform duration-300 ease-in-out ${
              selectedComponent === "cinema"
                ? "translate-x-full"
                : selectedComponent === "movie"
                ? "translate-x-[200%]"
                : selectedComponent === "projection"
                ? "translate-x-[300%]"
                : ""
            }`}
          ></span>
        </div>
      </div>

      <div className="w-full">
        {selectedComponent === "reservations" && <ChechUserReservations />}
        {selectedComponent === "cinema" && <CreateCinema />}
        {selectedComponent === "movie" && <AddMovie />}
        {selectedComponent === "projection" && <AddProjection />}
      </div>
    </div>
  );
};
