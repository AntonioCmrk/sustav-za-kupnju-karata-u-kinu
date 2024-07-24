import { NavLink } from "react-router-dom";

export const MovieCard = () => {
  return (
    <NavLink to={"/movie-details"}>
      <div className="rounded-2xl bg-primary-light p-4 cursor-pointer transform hover:scale-125 transition duration-300">
        MovieCard
      </div>
    </NavLink>
  );
};
