import React, { useState } from "react";
import { createCinema } from "../api/createCinema";
import { CreateCinemaRequestDto } from "../types";
import toast from "react-hot-toast";
import { uploadImage } from "../api/uploadImage";

export const CreateCinema: React.FC = () => {
  const [cinema, setCinema] = useState<CreateCinemaRequestDto>({
    name: "",
    numberOfAuditoriums: 1,
    image: "",
    addressDto: {
      postalCode: 0,
      city: "",
      country: "",
      streetName: "",
      houseNumber: 0,
    },
    auditoriums: [
      {
        name: "",
        numberOfRows: 0,
        numberOfColumns: 0,
      },
    ],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (
      ["postalCode", "city", "country", "streetName", "houseNumber"].includes(
        name
      )
    ) {
      setCinema({
        ...cinema,
        addressDto: {
          ...cinema.addressDto,
          [name]: value,
        },
      });
    } else if (index === undefined) {
      setCinema({
        ...cinema,
        [name]: value,
      });
    } else {
      const updatedAuditoriums = [...cinema.auditoriums];
      updatedAuditoriums[index] = {
        ...updatedAuditoriums[index],
        [name]: value,
      };
      setCinema({ ...cinema, auditoriums: updatedAuditoriums });
    }
  };

  const addAuditorium = () => {
    setCinema({
      ...cinema,
      auditoriums: [
        ...cinema.auditoriums,
        {
          name: "",
          numberOfRows: 0,
          numberOfColumns: 0,
        },
      ],
    });
  };

  const removeAuditorium = (index: number) => {
    const updatedAuditoriums = cinema.auditoriums.filter((_, i) => i !== index);
    setCinema({
      ...cinema,
      auditoriums: updatedAuditoriums,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload an image first.", {
        position: "bottom-center",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const uploadResponse = await uploadImage(formData);

      if (!uploadResponse.data?.fileName) {
        throw new Error("Image upload failed. No filename returned.");
      }

      const { fileName } = uploadResponse.data;

      const totalSeats = cinema.auditoriums.reduce(
        (total, auditorium) =>
          total + auditorium.numberOfRows * auditorium.numberOfColumns,
        0
      );

      const cinemaData = {
        ...cinema,
        image: fileName,
        numberOfSeats: totalSeats,
      };

      await createCinema(cinemaData);

      toast.success("Cinema created successfully!", {
        position: "bottom-center",
      });

      setCinema({
        name: "",
        numberOfAuditoriums: 1,
        image: "",
        addressDto: {
          postalCode: 0,
          city: "",
          country: "",
          streetName: "",
          houseNumber: 0,
        },
        auditoriums: [
          {
            name: "",
            numberOfRows: 0,
            numberOfColumns: 0,
          },
        ],
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error creating cinema:", error);
      toast.error("Error creating cinema. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="bg-primary-dark rounded-2xl min-h-screen min-w-[600px] p-6 flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold mb-6">Create New Cinema</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Cinema Name
          </label>
          <input
            type="text"
            name="name"
            value={cinema.name}
            onChange={(e) => handleInputChange(e)}
            className="w-full p-2 border border-primary-light rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Number of Auditoriums
          </label>
          <input
            type="number"
            name="numberOfAuditoriums"
            value={cinema.numberOfAuditoriums}
            onChange={(e) => handleInputChange(e)}
            className="w-full p-2 border border-primary-light rounded dec [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-primary-light rounded"
          />
        </div>

        <h2 className="text-xl text-primary-dark font-bold mb-4">Address</h2>
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={cinema.addressDto.postalCode}
            onChange={(e) => handleInputChange(e)}
            className="w-full p-2 border border-primary-light rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={cinema.addressDto.city}
            onChange={(e) => handleInputChange(e)}
            className="w-full p-2 border border-primary-light rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={cinema.addressDto.country}
            onChange={(e) => handleInputChange(e)}
            className="w-full p-2 border border-primary-light rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            Street Name
          </label>
          <input
            type="text"
            name="streetName"
            value={cinema.addressDto.streetName}
            onChange={(e) => handleInputChange(e)}
            className="w-full p-2 border border-primary-light rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-dark text-sm font-bold mb-2">
            House Number
          </label>
          <input
            type="number"
            name="houseNumber"
            value={cinema.addressDto.houseNumber}
            onChange={(e) => handleInputChange(e)}
            className="w-full p-2 border border-primary-light rounded"
          />
        </div>

        <h2 className="text-xl text-primary-dark font-bold mb-4">
          Auditoriums
        </h2>
        {cinema.auditoriums.map((auditorium, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-secondary-dark rounded bg-quaternary-light"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-primary-dark font-bold">
                Auditorium {index + 1}
              </h3>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeAuditorium(index)}
                  className="text-accent-dark hover:text-accent-hover"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="mt-2">
              <label className="block text-primary-dark text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={auditorium.name}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full p-2 border border-primary-light rounded"
              />
            </div>
            <div className="mt-2">
              <label className="block text-primary-dark text-sm font-bold mb-2">
                Number of Rows
              </label>
              <input
                type="number"
                name="numberOfRows"
                value={auditorium.numberOfRows}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full p-2 border border-primary-light rounded"
              />
            </div>
            <div className="mt-2">
              <label className="block text-primary-dark text-sm font-bold mb-2">
                Number of Columns
              </label>
              <input
                type="number"
                name="numberOfColumns"
                value={auditorium.numberOfColumns}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full p-2 border border-primary-light rounded"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addAuditorium}
          className="bg-secondary-light hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Auditorium
        </button>

        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded mt-6 w-full"
        >
          Create Cinema
        </button>
      </form>
    </div>
  );
};
