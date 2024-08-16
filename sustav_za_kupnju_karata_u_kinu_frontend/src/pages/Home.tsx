import { useQuery } from "react-query";
import { CinemaCard } from "../components/CinemaCard";
import { Link } from "react-router-dom";
import { getAllCinemas } from "../api/getAllCinemas";
import { useDispatch } from "react-redux";
import { selectCinema } from "../state/cinema/cinemaSlice";
import { Cinema } from "../types";
export const Home = () => {
  const {
    data: allCinemas,
    isLoading,
    error,
  } = useQuery(["allCinemas"], () => getAllCinemas().then((r) => r?.data));

  if (isLoading) return <p>Loading...</p>;
  if (error && error instanceof Error) {
    return <p>Error loading projections: {error.message}</p>;
  }

  const dispatch = useDispatch();

  const handleCinemaSelect = (cinema: Cinema) => {
    dispatch(selectCinema(cinema));
  };

  return (
    <div className="flex m-4">
      {allCinemas === null
        ? null
        : allCinemas?.map((cinema: any) => (
            <Link
              to={`/cinema-page`}
              className="m-10"
              key={cinema.id}
              onClick={() => handleCinemaSelect(cinema)}
            >
              <CinemaCard cinema={cinema} />
            </Link>
          ))}
    </div>
  );
};
