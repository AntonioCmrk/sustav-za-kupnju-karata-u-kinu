import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import reservationContractAbi from "../abi/reservationContractAbi.json";
import { Reservation, Seat } from "../types";
import { CONTRACT_ADDRESS } from "../constants";
import { RootState } from "../state/store";

export const UsersTickets = () => {
  const username = useSelector((state: RootState) => state.auth.user);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  const reservationContractAddress = CONTRACT_ADDRESS;

  const handleFetchReservations = async () => {
    if (!username) {
      alert("No username found. Please log in.");
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

  useEffect(() => {
    if (username) {
      handleFetchReservations();
    }
  }, [username]);

  return (
    <div className="p-6 bg-primary-dark text-quaternary-light rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Reservations:</h2>

      {reservations.length > 0 && (
        <div className="mt-6">
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
