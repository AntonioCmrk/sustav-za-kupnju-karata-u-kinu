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
    // <div
    //   className={`w-screen h-96 bg-no-repeat bg-cover bg-center bg-[linear-gradient(transparent,#59B8C8),url('../src/assets/homeBackground.jpg')]`}
    // ></div>
    <div className="flex m-4">
      {data === null
        ? null
        : allCinemas?.map((cinema: any) => (
            <Link to={"/cinema-page"} className="m-10">
              <CinemaCard cinema={cinema} />
            </Link>
          ))}
    </div>
  );
};
