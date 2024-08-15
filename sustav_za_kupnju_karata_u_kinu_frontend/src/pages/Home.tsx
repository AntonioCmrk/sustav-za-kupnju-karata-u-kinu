import { useQuery } from "react-query";
import { CinemaCard } from "../components/CinemaCard";
import { Link } from "react-router-dom";
import { getAllCinemas } from "../api/getAllCinemas";
export const Home = () => {
  const { data } = useQuery(["allCinemas"], () =>
    getAllCinemas().then((r) => r?.data)
  );
  const allCinemas = data;
  return (
    <div className="flex m-4">
      {data === null
        ? null
        : allCinemas?.map((cinema: any) => (
            <Link
              to={`/cinema-page/${cinema.id}`}
              className="m-10"
              key={cinema.id}
            >
              <CinemaCard cinema={cinema} />
            </Link>
          ))}
    </div>
  );
};
