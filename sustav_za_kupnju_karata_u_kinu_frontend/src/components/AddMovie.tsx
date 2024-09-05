import React, { useState } from "react";
import { createMovie } from "../api/createMovie";
import { CreateMovieRequestDto } from "../types";
import toast from "react-hot-toast";

export const AddMovie: React.FC = () => {
  const [movie, setMovie] = useState<CreateMovieRequestDto>({
    title: "",
    shortDescription: "",
    description: "",
    lengthInMinutes: 0,
    originalTitle: "",
    genre: "",
    year: new Date().getFullYear(),
    country: "",
    coverImage: "",
    backgroundImage: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMovie(movie);
      toast.success("Movie created successfully!", {
        position: "bottom-center",
      });
      setMovie({
        title: "",
        shortDescription: "",
        description: "",
        lengthInMinutes: 0,
        originalTitle: "",
        genre: "",
        year: new Date().getFullYear(),
        country: "",
        coverImage: "",
        backgroundImage: "",
      });
    } catch (error) {
      toast.error("Failed to create the movie. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="bg-primary-dark rounded-2xl p-6 min-w-[600px] flex flex-col items-center justify-center">
      <h1 className="text-3xl text-white font-bold mb-6">Create New Movie</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={movie.shortDescription}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={movie.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Length (in minutes)
          </label>
          <input
            type="number"
            name="lengthInMinutes"
            value={movie.lengthInMinutes}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Original Title
          </label>
          <input
            type="text"
            name="originalTitle"
            value={movie.originalTitle}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Year
          </label>
          <input
            type="number"
            name="year"
            value={movie.year}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={movie.country}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            value={movie.coverImage}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Background Image URL
          </label>
          <input
            type="text"
            name="backgroundImage"
            value={movie.backgroundImage}
            onChange={handleInputChange}
            className="w-full p-2 border border-primary-light rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          Create Movie
        </button>
      </form>
    </div>
  );
};
