import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { RootState } from "../state/store";
import { getNoSeatRowColumn } from "../api/getNoSeatRowColumn";
import { getSeatReservations } from "../api/getSeatReservations";
import { reserveSeats } from "../api/reserveSeats";
import { ethers } from "ethers";
import reservationContractAbi from "../abi/reservationContractAbi.json";
import { useNavigate } from "react-router-dom";
import { setReservationDetails } from "../state/reservation/reservationSlice";
import { ReservationData, Seat } from "../types";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { Tooltip } from "react-tooltip";
import { CONTRACT_ADDRESS } from "../constants";

export const SelectSeats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isBlockchainLoading, setIsBlockchainLoading] = useState(false); // New loading state for blockchain interaction
  const token = useSelector((state: RootState) => state.auth.token);

  const projection = useSelector(
    (state: RootState) => state.projection.selectedProjection
  );

  const {
    data: auditoriumDetailsResponse,
    isLoading: isLoadingSeats,
    isError: isErrorSeats,
    error: errorSeats,
  } = useQuery(
    ["getSeatReservations", projection?.auditoriumId],
    () => getNoSeatRowColumn(projection.auditoriumId),
    {
      enabled: !!projection?.auditoriumId,
    }
  );

  const {
    data: reservationsResponse,
    isLoading: isLoadingReservations,
    isError: isErrorReservations,
    error: errorReservations,
  } = useQuery(
    ["reservations", projection?.id],
    () => getSeatReservations(projection.id),
    {
      enabled: !!projection?.id,
    }
  );

  const { mutate: reserve, isLoading: isReserving } = useMutation(
    reserveSeats,
    {
      onSuccess: (data) => {
        alert("Reservation successful!");
        setSelectedSeats([]);
        dispatch(
          setReservationDetails({
            userName: data.userName,
            movieName: data.movieName,
            cinemaName: data.cinemaName,
            auditoriumName: data.auditoriumName,
            seats: data.seats,
            projectionDateTime: Math.floor(
              new Date(data.projectionDateTime).getTime() / 1000
            ),
          })
        );
        navigate("/success-purchase");
      },
      onError: (error: any) => {
        alert(`Reservation failed: ${error.message}`);
      },
    }
  );

  const handleSeatClick = (seatId: number) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  const handleBlockchainReservation = async (
    reservationData: ReservationData
  ): Promise<boolean> => {
    try {
      setIsBlockchainLoading(true); // Set loading to true when transaction starts
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Ensure account access is requested only once
      const signer = await provider.getSigner();

      const reservationContractAddress = CONTRACT_ADDRESS;
      const reservationContract = new ethers.Contract(
        reservationContractAddress,
        reservationContractAbi,
        signer
      );

      const seats = reservationData.seats.map((seat: Seat) => ({
        row: seat.row,
        column: seat.column,
      }));

      // Combine everything into a single transaction
      const tx = await reservationContract.createReservation(
        reservationData.reservationId,
        reservationData.userId,
        reservationData.userName,
        reservationData.cinemaName,
        reservationData.auditoriumName,
        reservationData.movieName,
        Math.floor(
          new Date(reservationData.projectionDateTime).getTime() / 1000
        ),
        seats,
        Math.floor(new Date().getTime() / 1000)
      );

      await tx.wait(); // Wait for the transaction to complete

      setIsBlockchainLoading(false); // Set loading to false when transaction completes
      return true; // Return success
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";
      console.error("Failed to save reservation:", errorMessage);

      setIsBlockchainLoading(false); // Set loading to false on error
      return false; // Return failure
    }
  };

  const handleReserve = async () => {
    if (!token) {
      alert("You need to be logged in to reserve seats.");
      navigate("/auth");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const reservationData = {
      reservationId: 0,
      userId: "user-id",
      userName: "username",
      cinemaName: "cinema name",
      auditoriumName: "auditorium name",
      movieName: "movie name",
      projectionDateTime: projection.dateTime,
      seats: selectedSeats.map((seatId) => ({
        row: 1,
        column: seatId,
      })),
    };

    const blockchainSuccess = await handleBlockchainReservation(
      reservationData
    );

    if (blockchainSuccess) {
      reserve({
        projectionId: projection.id,
        seatIds: selectedSeats,
      });
    } else {
      alert("Blockchain reservation failed. Reservation was not completed.");
    }
  };

  if (
    isLoadingSeats ||
    isLoadingReservations ||
    isReserving ||
    isBlockchainLoading
  )
    return <p className="text-primary-light">Loading...</p>;
  if (isErrorSeats || isErrorReservations)
    return (
      <p className="text-error">
        Error:{" "}
        {(errorSeats as Error)?.message ||
          (errorReservations as Error)?.message}
      </p>
    );
  if (!auditoriumDetailsResponse?.data || !reservationsResponse?.data)
    return <p className="text-primary-light">No data available.</p>;

  const auditoriumDetails = auditoriumDetailsResponse.data;
  const reservations = reservationsResponse.data;

  const renderSeats = () => {
    const seats = [];

    seats.push(
      <div key="column-labels" className="grid grid-cols-1">
        <div className="h-8" />
        {Array.from(
          { length: auditoriumDetails.numberOfRows },
          (_, rowIndex) => (
            <div
              key={`row-label-${rowIndex + 1}`}
              className="flex items-center justify-center font-bold"
            >
              Row {rowIndex + 1}
            </div>
          )
        )}
      </div>
    );

    for (let col = 1; col <= auditoriumDetails.numberOfColumns; col++) {
      const columnSeats = [];

      columnSeats.push(
        <div
          key={`col-label-${col}`}
          className="flex items-center justify-center font-bold"
        >
          Col {col}
        </div>
      );

      for (let row = 1; row <= auditoriumDetails.numberOfRows; row++) {
        const seat = reservations.find(
          (res: any) => res.row === row && res.column === col
        );

        const isReserved = !seat?.isAvailable;
        const isSelected = selectedSeats.includes(seat?.seatId || 0);

        columnSeats.push(
          <div
            key={`seat-${row}-${col}`}
            onClick={() => !isReserved && handleSeatClick(seat.seatId)}
            data-tooltip-id="already-taken-seat"
            data-tooltip-content={`${
              isReserved ? "This seat is already taken." : ""
            }`}
            className={`cursor-pointer w-10 h-10 flex items-center justify-center 
              ${
                isReserved
                  ? "text-accent-dark cursor-not-allowed"
                  : isSelected
                  ? "text-accent"
                  : "text-quaternary-light"
              }`}
          >
            <EventSeatIcon fontSize="large" />
            <Tooltip id="already-taken-seat" />
          </div>
        );
      }

      seats.push(
        <div key={`column-${col}`} className="grid grid-cols-1">
          {columnSeats}
        </div>
      );
    }

    return seats;
  };

  return (
    <div className="p-6 bg-primary-dark text-quaternary-light rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Select your seats:</h2>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${
            auditoriumDetails.numberOfColumns + 1
          }, 1fr)`,
        }}
      >
        {renderSeats()}
      </div>
      <button
        className="mt-6 w-full py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg shadow-md"
        onClick={handleReserve}
        disabled={isBlockchainLoading} // Disable button while loading
      >
        {isBlockchainLoading ? "Reserving..." : "Reserve Selected Seats"}
      </button>
    </div>
  );
};
