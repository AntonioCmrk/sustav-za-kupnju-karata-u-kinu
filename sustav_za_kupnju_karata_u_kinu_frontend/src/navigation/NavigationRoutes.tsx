import { Home } from "../pages/Home";
import { Error } from "../pages/Error";
import { Route, Routes } from "react-router-dom";
import { CinemaPage } from "../pages/CinemaPage";
import { MovieDetails } from "../pages/MovieDetails";
import { SelectSeats } from "../pages/SelectSeats";
import { Auth } from "../pages/Auth";
import PrivateRoute from "./PrivateRoute";
import { Dashboard } from "../pages/Dashboard";
import { SuccessPurchase } from "../pages/SuccessPurchase";
import { UsersTickets } from "../pages/UsersTickets";
import PrivateAdminRoute from "./PrivateAdminRoute";

export const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/cinema-page" element={<CinemaPage />} />
      <Route path="/movie-details" element={<MovieDetails />} />
      <Route path="/select-seats" element={<SelectSeats />} />
      <Route path="/success-purchase" element={<SuccessPurchase />} />
      <Route
        path="/dashboard"
        element={
          <PrivateAdminRoute>
            <Dashboard />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/user-tickets"
        element={
          <PrivateRoute>
            <UsersTickets />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
