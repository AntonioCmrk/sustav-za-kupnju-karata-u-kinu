import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { RootState } from "../state/store";
import { getNoSeatRowColumn } from "../api/getNoSeatRowColumn";
import { getSeatReservations } from "../api/getSeatReservations";
import { reserveSeats } from "../api/reserveSeats";

export const SelectSeats = () => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const projection = useSelector(
    (state: RootState) => state.projection.selectedProjection
  );

  const {
    data: auditoriumDetailsResponse,
    isLoading: isLoadingSeats,
    isError: isErrorSeats,
    error: errorSeats,
  } = useQuery(
    ["auditoriumDetails", projection?.auditoriumId],
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

  const handleReserve = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    reserve({ projectionId: projection.id, seatIds: selectedSeats });
  };

  if (isLoadingSeats || isLoadingReservations || isReserving)
    return <p>Loading...</p>;
  if (isErrorSeats || isErrorReservations)
    return (
      <p>
        Error:{" "}
        {(errorSeats as Error)?.message ||
          (errorReservations as Error)?.message}
      </p>
    );
  if (!auditoriumDetailsResponse?.data || !reservationsResponse?.data)
    return <p>No data available.</p>;

  const auditoriumDetails = auditoriumDetailsResponse.data;
  const reservations = reservationsResponse.data;

  const renderSeats = () => {
    const seats = [];
    for (let row = 1; row <= auditoriumDetails.numberOfRows; row++) {
      for (let col = 1; col <= auditoriumDetails.numberOfColumns; col++) {
        const seat = reservations.find(
          (res: any) => res.row === row && res.column === col
        );

        if (!seat) continue;

        const isReserved = !seat.isAvailable;
        const isSelected = selectedSeats.includes(seat.seatId);

        seats.push(
          <label key={seat.seatId}>
            <input
              type="checkbox"
              checked={isSelected}
              disabled={isReserved}
              onChange={() => handleSeatClick(seat.seatId)}
            />{" "}
            Row {row}, Col {col}
          </label>
        );
      }
    }
    return seats;
  };

  return (
    <div>
      <h2>Select your seats:</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${auditoriumDetails.numberOfColumns}, 1fr)`,
          gap: "10px",
        }}
      >
        {renderSeats()}
      </div>
      <button onClick={handleReserve} disabled={isReserving}>
        Reserve Selected Seats
      </button>
    </div>
  );
};
