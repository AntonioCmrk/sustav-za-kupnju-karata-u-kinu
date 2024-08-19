import { IMG_URL } from "../constants";
export const MovieCard = ({ projection }: any) => {
  const { movieTitle, movieCoverImage } = projection;

  return (
    <div className="rounded-2xl bg-terary-light cursor-pointer transform hover:scale-110 transition duration-300 shadow-lg max-w-xs h-min m-4">
      <img
        src={IMG_URL + movieCoverImage}
        alt={movieTitle}
        className="rounded-t-2xl w-full h-full object-cover"
      />
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold p-4 text-primary-dark">
          {movieTitle}
        </h3>
      </div>
    </div>
  );
};
