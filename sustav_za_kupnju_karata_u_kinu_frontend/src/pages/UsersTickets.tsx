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

  const fetchReservationsWithTxHashes = async () => {
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

      const filter = reservationContract.filters.ReservationCreated();
      const events = await reservationContract.queryFilter(filter);

      const formattedReservations = reservations.map((reservation: any) => {
        const matchingEvent = events.find(
          (event: any) =>
            event.args.reservationId.toString() ===
            reservation.reservationId.toString()
        );

        const transactionHash = matchingEvent
          ? matchingEvent.transactionHash
          : "N/A";

        return {
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
          transactionHash: transactionHash,
        };
      });

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
      fetchReservationsWithTxHashes();
    }
  }, [username]);

  return (
    <div className="p-6 m-6 bg-primary-dark text-quaternary-light rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Reservations:</h2>

      {loading && <p>Loading reservations...</p>}

      {!loading && reservations.length > 0 && (
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
                  <ul className="list-disc pl-6">
                    {reservation.seats.map((seat: Seat, seatIndex: number) => (
                      <li key={seatIndex}>
                        Row: {seat[0].toString()}, Col: {seat[1].toString()}
                      </li>
                    ))}
                  </ul>{" "}
                </p>
                <p>
                  <strong>Reservation Time:</strong>{" "}
                  {reservation.reservationTime}
                </p>
                {reservation.transactionHash &&
                  reservation.transactionHash !== "N/A" && (
                    <p>
                      <strong>Transaction:</strong>{" "}
                      <a
                        href={`https://sepolia.etherscan.io/tx/${reservation.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        View on Etherscan
                      </a>
                    </p>
                  )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && reservations.length === 0 && <p>No reservations found.</p>}
    </div>
  );
};
