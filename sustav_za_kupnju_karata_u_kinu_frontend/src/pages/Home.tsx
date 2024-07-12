import { CinemaCard } from "../components/CinemaCard";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    // <div
    //   className={`w-screen h-96 bg-no-repeat bg-cover bg-center bg-[linear-gradient(transparent,#59B8C8),url('../src/assets/homeBackground.jpg')]`}
    // ></div>
    <div>
      <Link to={"/cinema-page"}>
        <CinemaCard />
      </Link>
    </div>
  );
};
