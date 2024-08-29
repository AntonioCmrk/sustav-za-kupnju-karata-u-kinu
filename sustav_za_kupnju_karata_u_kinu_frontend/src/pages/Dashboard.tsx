import { ethers } from "ethers";
import { useState } from "react";
import reservationContractAbi from "../abi/reservationContractAbi.json";
import { Reservation, Seat } from "../types";
import { CONTRACT_ADDRESS } from "../constants";

export const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  const reservationContractAddress = CONTRACT_ADDRESS;
  const handleFetchReservations = async () => {
    if (!username.trim()) {
      alert("Please enter a valid username.");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const reservationContract = new ethers.Contract(
        reservationContractAddress,
        reservationContractAbi,
        signer
      );

      const reservations = await reservationContract.getReservationsByUsername(
        username
      );

      const formattedReservations = reservations.map((reservation: any) => ({
        reservationId: reservation.reservationId,
        userId: reservation.userId,
        userName: reservation.userName,
        cinemaName: reservation.cinemaName,
        auditoriumName: reservation.auditoriumName,
        movieName: reservation.movieName,
        projectionDateTime: new Date(
          Number(reservation.projectionDateTime) * 1000
        ).toLocaleString(),
        seats: reservation.seats,
        reservationTime: new Date(
          Number(reservation.reservationTime) * 1000
        ).toLocaleString(),
      }));

      setReservations(formattedReservations);
    } catch (error: any) {
      console.error("Failed to fetch reservations:", error);
      alert(
        `Failed to fetch reservations. Please try again. Error: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-primary-dark text-quaternary-light rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Fetch Reservations by Username
      </h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-xl font-medium mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded-lg text-primary-dark"
          placeholder="Enter your username"
        />
      </div>
      <button
        onClick={handleFetchReservations}
        className="bg-accent text-white font-bold py-2 px-4 rounded-lg w-full"
        disabled={loading}
      >
        {loading ? "Fetching..." : "Fetch Reservations"}
      </button>

      {reservations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Reservations:</h3>
          <ul className="list-disc pl-5 space-y-2 list-none">
            {reservations.map((reservation, index) => (
              <li key={index} className="bg-quaternary-dark p-4 rounded-lg">
                <p>
                  <strong>Reservation ID:</strong>{" "}
                  {reservation.reservationId.toString()}
                </p>
                <p>
                  <strong>Cinema:</strong> {reservation.cinemaName}
                </p>
                <p>
                  <strong>Auditorium:</strong> {reservation.auditoriumName}
                </p>
                <p>
                  <strong>Movie:</strong> {reservation.movieName}
                </p>
                <p>
                  <strong>Projection Time:</strong>{" "}
                  {reservation.projectionDateTime}
                </p>
                <p>
                  <strong>Seats:</strong>{" "}
                  {reservation.seats
                    .map(
                      (seat: Seat) => `Row: ${seat.row}, Col: ${seat.column}`
                    )
                    .join(", ")}
                </p>
                <p>
                  <strong>Reservation Time:</strong>{" "}
                  {reservation.reservationTime}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
