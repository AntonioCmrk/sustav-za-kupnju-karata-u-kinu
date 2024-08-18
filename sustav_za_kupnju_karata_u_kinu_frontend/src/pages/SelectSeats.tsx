import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useQuery } from "react-query";
import { getNoSeatRowColumn } from "../api/getNoSeatRowColumn";
import { getSeatReservations } from "../api/getSeatReservations";

export const SelectSeats = () => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const projection = useSelector(
    (state: RootState) => state.projection.selectedProjection
  );

  // Fetch auditorium details
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

  // Fetch seat reservations
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

  if (isLoadingSeats || isLoadingReservations) return <p>Loading...</p>;
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

  const handleSeatClick = (seatId: number) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

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
    </div>
  );
};
