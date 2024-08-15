import { NavLink } from "react-router-dom";
import { IMG_URL } from "../constants";
export const MovieCard = ({ projection }: any) => {
  const { movieTitle, movieCoverImage } = projection;

  return (
    <NavLink to={"/movie-details"}>
      <div className="rounded-2xl bg-primary-light p-4 cursor-pointer transform hover:scale-105 transition duration-300 shadow-lg max-w-xs">
        <img
          src={IMG_URL + movieCoverImage}
          alt={movieTitle}
          className="rounded-t-2xl w-full h-64 object-cover"
        />
        <div className="mt-2 text-center">
          <h3 className="text-lg font-semibold">{movieTitle}</h3>
        </div>
      </div>
    </NavLink>
  );
};
