import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { getAllCinemas } from "../api/getAllCinemas";
import { getAuditoriumsByCinemaId } from "../api/getAuditoriumsByCinemaId";
import { getAllMovies } from "../api/getAllMovies";
import { createProjection } from "../api/createProjection";
import toast from "react-hot-toast";

export const AddProjection: React.FC = () => {
  const [cinemas, setCinemas] = useState<any[]>([]);
  const [auditoriums, setAuditoriums] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState<number | null>(null);
  const [projection, setProjection] = useState({
    movieId: 0,
    auditoriumId: 0,
    dateTime: new Date(), // Default to current date/time
    price: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: cinemaData } = await getAllCinemas();
        const movieData = await getAllMovies();

        setCinemas(cinemaData || []);
        setMovies(movieData || []);

        if (movieData && movieData.length > 0) {
          setProjection((prevProjection) => ({
            ...prevProjection,
            movieId: movieData[0].id,
          }));
        }
      } catch (error) {
        toast.error("Failed to fetch data. Please try again.");
      }
    }
    fetchData();
  }, []);

  const handleCinemaChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const cinemaId = parseInt(e.target.value);
    setSelectedCinemaId(cinemaId);
    try {
      const auditoriumData = await getAuditoriumsByCinemaId(cinemaId);

      if (auditoriumData && auditoriumData.length > 0) {
        setProjection({
          ...projection,
          auditoriumId: auditoriumData[0].id,
        });
      } else {
        setProjection({ ...projection, auditoriumId: 0 });
      }

      setAuditoriums(auditoriumData || []);
    } catch (error) {
      toast.error("Failed to fetch auditoriums.");
    }
  };

  function toCETString(date: any) {
    const cetOffset = 4;
    const dstOffset = date.getTimezoneOffset() / 60;
    const offsetDifference = cetOffset + dstOffset;

    date.setHours(date.getHours() + offsetDifference);

    return date.toISOString().slice(0, 19).replace("T", " ");
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "auditoriumId" || name === "movieId" || name === "price") {
      setProjection({ ...projection, [name]: parseInt(value) });
    } else {
      setProjection({ ...projection, [name]: value });
    }
  };

  const handleDateChange = (selectedDates: Date[]) => {
    setProjection({ ...projection, dateTime: selectedDates[0] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const localDateTime = toCETString(new Date(projection.dateTime));
    console.log(localDateTime);
    console.log("a1" + localDateTime);
    console.log("a2" + projection.dateTime);
    const payload = {
      ...projection,
      cinemaId: selectedCinemaId as number,
      dateTime: localDateTime,
    };

    console.log("Sending payload:", payload);

    try {
      await createProjection(payload);
      toast.success("Projection created successfully!");
    } catch (error) {
      console.error("Error creating projection:", error);
      toast.error("Failed to create the projection.");
    }
  };

  return (
    <div className="bg-primary-dark rounded-2xl p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl text-white font-bold mb-6">Add New Projection</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Select Cinema
          </label>
          <select
            name="cinemaId"
            value={selectedCinemaId || ""}
            onChange={handleCinemaChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          >
            <option value="" disabled>
              Choose a Cinema
            </option>
            {cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name}
              </option>
            ))}
          </select>
        </div>

        {auditoriums.length > 0 && (
          <div className="mb-4">
            <label className="block text-primary-dark text-sm font-bold mb-2">
              Select Auditorium
            </label>
            <select
              name="auditoriumId"
              value={projection.auditoriumId || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-primary-light rounded"
              required
            >
              {auditoriums.map((auditorium) => (
                <option key={auditorium.id} value={auditorium.id}>
                  {auditorium.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Select Movie
          </label>
          <select
            name="movieId"
            value={projection.movieId || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          >
            <option value="" disabled>
              Choose a Movie
            </option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Date and Time
          </label>
          <Flatpickr
            data-enable-time
            value={projection.dateTime}
            options={{
              dateFormat: "d.m.Y H:i",
              enableTime: true,
              time_24hr: true,
            }}
            onChange={handleDateChange}
            className="w-full p-2 border border-primary-light rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={projection.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          Add Projection
        </button>
      </form>
    </div>
  );
};
