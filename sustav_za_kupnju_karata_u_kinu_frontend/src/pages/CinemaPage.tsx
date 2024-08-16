import { MovieCard } from "../components/MovieCard";
import { useQuery } from "react-query";
import { getProjectionsByCinemaId } from "../api/getProjectionsByCinemaId";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Cinema, Projection } from "../types";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectProjection } from "../state/projection/projectionSlice";

export const CinemaPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedCinema = useSelector<RootState, Cinema | null>(
    (state) => state.cinema.selectedCinema
  );
  if (!selectedCinema) {
    navigate("/");
    return null;
  }

  const { data, isLoading, error } = useQuery(
    ["projections", selectedCinema.id],
    () => getProjectionsByCinemaId(selectedCinema.id).then((r) => r.data),
    {
      enabled: !!selectedCinema.id,
    }
  );

  if (isLoading) return <p className="text-center text-primary">Loading...</p>;
  if (error && error instanceof Error) {
    return (
      <p className="text-center text-accent-dark">
        Error loading projections: {error.message}
      </p>
    );
  }

  const handleProjectionSelect = (projection: Projection) => {
    dispatch(selectProjection(projection));
  };

  return (
    <div className="p-6 bg-primary text-quaternary-light rounded-3xl my-16 mx-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Projections for {selectedCinema.name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.length ? (
          data.map((projection: Projection) => (
            <NavLink
              to={"/movie-details"}
              key={projection.id}
              onClick={() => handleProjectionSelect(projection)}
              className="block p-4 rounded-xl shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1"
            >
              <MovieCard projection={projection} />
            </NavLink>
          ))
        ) : (
          <p className="text-center col-span-full text-secondary">
            No projections available.
          </p>
        )}
      </div>
    </div>
  );
};
