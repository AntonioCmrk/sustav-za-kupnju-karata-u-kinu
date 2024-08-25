import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Link } from "react-router-dom";

export const SuccessPurchase = () => {
  const reservation = useSelector((state: RootState) => state.reservation);

  const formattedDateTime = new Date(
    reservation.projectionDateTime * 1000
  ).toLocaleString();

  return (
    <div className="p-6 bg-primary-dark text-white rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-bold text-accent mb-4 text-center">
        Success!
      </h2>
      <div className="bg-primary p-4 rounded-lg mb-4">
        <p className="text-secondary-light text-lg mb-2">
          <span className="font-semibold">User:</span> {reservation.userName}
        </p>
        <p className="text-secondary-light text-lg mb-2">
          <span className="font-semibold">Movie:</span> {reservation.movieName}
        </p>
        <p className="text-secondary-light text-lg mb-2">
          <span className="font-semibold">Cinema:</span>{" "}
          {reservation.cinemaName}
        </p>
        <p className="text-secondary-light text-lg mb-2">
          <span className="font-semibold">Auditorium:</span>{" "}
          {reservation.auditoriumName}
        </p>
        <p className="text-secondary-light text-lg mb-2">
          <span className="font-semibold">Projection Date and Time:</span>{" "}
          {formattedDateTime}
        </p>
        <p className="text-secondary-light text-lg">
          <span className="font-semibold">Seats:</span>
          <ul className="list-disc list-inside">
            {reservation.seats.map((seat: any, index: any) => (
              <li key={index}>
                Row {seat.row}, Col {seat.column}
              </li>
            ))}
          </ul>
        </p>
      </div>
      <Link
        to="/"
        className="w-full bg-accent hover:bg-accent-hover text-white py-2 px-4 rounded-lg mt-4"
      >
        Go to Home
      </Link>
    </div>
  );
};
