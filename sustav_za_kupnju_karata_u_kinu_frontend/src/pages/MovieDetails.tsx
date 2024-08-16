import { PrimaryButton } from "../components/PrimaryButton";
import { NavLink, useNavigate } from "react-router-dom";
import { IMG_URL } from "../constants";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ProjectionDetails } from "../types";
import { useQuery } from "react-query";
import { getProjectionDetailsByProjectionId } from "../api/getProjectionDetails";

export const MovieDetails = () => {
  const navigate = useNavigate();

  const selectedProjection = useSelector(
    (state: RootState) => state.projection.selectedProjection
  );

  if (!selectedProjection) {
    return <p className="text-center">No projection selected.</p>;
  }

  const {
    data: projectionDetails,
    isLoading,
    error,
  } = useQuery(
    ["selectedProjectionDetails", selectedProjection.id],
    () =>
      getProjectionDetailsByProjectionId(selectedProjection.id).then(
        (r) => r.data
      ),
    {
      enabled: !!selectedProjection.id,
    }
  );
  if (isLoading) return <p>Loading...</p>;
  if (error && error instanceof Error) {
    return <p>Error loading projections: {error.message}</p>;
  }
  if (!projectionDetails)
    return <p className="text-center">No details available.</p>;

  const dateFormatter = new Intl.DateTimeFormat("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("hr-HR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = dateFormatter.format(
    new Date(projectionDetails.dateTime)
  );

  const formattedTime = timeFormatter.format(
    new Date(projectionDetails.dateTime)
  );
  return (
    <div className="bg-primary rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto my-16 p-4">
      <div className="relative">
        <img
          src={`${IMG_URL}/${projectionDetails.backgroundImage}`}
          alt={projectionDetails.movieTitle}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
      </div>
      <div className="p-4 bg-quaternary">
        <h1 className="text-3xl font-bold mb-4">
          {projectionDetails.movieTitle}
        </h1>
        <p className="text-gray-700 mb-6">{projectionDetails.description}</p>
        <div className="mb-6 space-y-2">
          <div className="text-primary-dark">
            <strong>Duration:</strong> {projectionDetails.lengthInMinutes}{" "}
            minutes
          </div>
          <div className="text-primary-dark">
            <strong>Original Title:</strong> {projectionDetails.originalTitle}
          </div>
          <div className="text-primary-dark">
            <strong>Genre:</strong> {projectionDetails.genre}
          </div>
          <div className="text-primary-dark">
            <strong>Year:</strong> {projectionDetails.year}
          </div>
          <div className="text-primary-dark">
            <strong>Country:</strong> {projectionDetails.country}
          </div>
        </div>
        <div className="bg-primary-dark p-4 rounded-lg mb-6 w-max m-auto text-quaternary-light text-center">
          <div className="text-xl font-bold mb-2">
            <strong>Date:</strong> {formattedDate}
          </div>
          <div className="text-xl font-bold mb-2">
            <strong>Time:</strong> {formattedTime}
          </div>
          <div className="text-xl font-bold text-red-600">
            <strong>Price:</strong> {projectionDetails.price}€
          </div>
        </div>
        <div className="m-auto  w-max">
          <NavLink to="/select-seats">
            <PrimaryButton text="Buy Ticket" onClick={() => {}} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
