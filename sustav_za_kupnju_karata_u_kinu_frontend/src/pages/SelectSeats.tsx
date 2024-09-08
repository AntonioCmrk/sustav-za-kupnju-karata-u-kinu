import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { RootState } from "../state/store";
import { getNoSeatRowColumn } from "../api/getNoSeatRowColumn";
import { getSeatReservations } from "../api/getSeatReservations";
import { reserveSeats } from "../api/reserveSeats";
import { deleteProjectionReservation } from "../api/deleteProjectionReservation";
import { ethers } from "ethers";
import reservationContractAbi from "../abi/reservationContractAbi.json";
import { useNavigate } from "react-router-dom";
import { setReservationDetails } from "../state/reservation/reservationSlice";
import { ReservationData, Seat } from "../types";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { Tooltip } from "react-tooltip";
import { CONTRACT_ADDRESS } from "../constants";
import ConfirmModal from "../components/ConfirmModal";

export const SelectSeats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedRowCol, setSelectedRowCol] = useState<Seat[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [isBlockchainLoading, setIsBlockchainLoading] = useState(false);
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
    { enabled: !!projection?.auditoriumId }
  );

  const {
    data: reservationsResponse,
    isLoading: isLoadingReservations,
    isError: isErrorReservations,
    error: errorReservations,
  } = useQuery(
    ["reservations", projection?.id],
    () => getSeatReservations(projection.id),
    { enabled: !!projection?.id }
  );

  const { mutate: reserve, isLoading: isReserving } = useMutation(
    reserveSeats,
    {
      onSuccess: async (data) => {
        console.log("Reservation API response:", data);

        try {
          setIsBlockchainLoading(true);

          if (!data.reservationId) {
            throw new Error("Reservation ID is missing from the response.");
          }

          await handleBlockchainReservation(data);

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
        } catch (error) {
          alert("Blockchain reservation failed. ");

          if (data?.reservationId) {
            await deleteProjectionReservation(data.reservationId);
            navigate("/cinema-page");
          } else {
            console.error(
              "Reservation ID is missing. Cannot delete reservation."
            );
          }
        } finally {
          setIsBlockchainLoading(false);
        }
      },
      onError: (error: any) => {
        alert(`Reservation failed: ${error.message}`);
      },
    }
  );

  const handleSeatClick = (seatId: number, row: number, col: number) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
    setSelectedRowCol((prevSelectedRowCol: any) =>
      prevSelectedRowCol.some(
        (seat: Seat) => seat.row === row && seat.column === col
      )
        ? prevSelectedRowCol.filter(
            (seat: Seat) => !(seat.row === row && seat.column === col)
          )
        : [...prevSelectedRowCol, { row, column: col }]
    );
  };

  const handleBlockchainReservation = async (
    reservationData: ReservationData
  ) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
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

      await tx.wait();
    } catch (err) {
      throw new Error("Failed to save reservation on blockchain.");
    }
  };

  const handleReserve = () => {
    if (!token) {
      alert("You need to be logged in to reserve seats.");
      navigate("/auth");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    setShowModal(true);
  };

  const confirmReservation = () => {
    setShowModal(false);
    reserve({ projectionId: projection.id, seatIds: selectedSeats });
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
            onClick={() =>
              !isReserved && handleSeatClick(seat.seatId, row, col)
            }
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

  const pricePerSeat = projection.price;
  const totalPrice = selectedSeats.length * pricePerSeat;

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
        disabled={isBlockchainLoading}
      >
        {isBlockchainLoading ? "Reserving..." : "Reserve Selected Seats"}
      </button>

      {showModal && (
        <ConfirmModal
          seats={selectedRowCol}
          pricePerSeat={pricePerSeat}
          totalPrice={totalPrice}
          movieName={projection.movieTitle}
          onConfirm={confirmReservation}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
