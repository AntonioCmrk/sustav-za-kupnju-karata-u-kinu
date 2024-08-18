import { Home } from "../pages/Home";
import { Error } from "../pages/Error";
import { Route, Routes } from "react-router-dom";
import { CinemaPage } from "../pages/CinemaPage";
import { MovieDetails } from "../pages/MovieDetails";
import { SelectSeats } from "../pages/SelectSeats";
import { Auth } from "../pages/Auth";
import PrivateRoute from "./PrivateRoute";
import { Dashboard } from "../pages/Dashboard";

export const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/cinema-page" element={<CinemaPage />} />
      <Route path="/movie-details" element={<MovieDetails />} />
      <Route path="/select-seats" element={<SelectSeats />} />
      <Route path="*" element={<Error />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute component={<Dashboard />} />}
      />
    </Routes>
  );
};
