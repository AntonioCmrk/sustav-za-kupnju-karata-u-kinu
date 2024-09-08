import React from "react";
import { ConfirmModalProps } from "../types";

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  seats,
  movieName,
  pricePerSeat,
  totalPrice,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-primary-dark p-8 rounded-lg shadow-lg max-w-md w-full text-white relative">
        <h2 className="text-2xl font-bold mb-4 text-primary-light">
          Confirm Reservation
        </h2>
        <p className="text-quaternary-light mb-2">Movie: {movieName}</p>{" "}
        <p className="text-quaternary-light mb-2">
          You are reserving {seats.length} seat(s):
        </p>
        <ul className="mb-4 text-secondary-light">
          {seats.map((seat, index) => (
            <li key={index} className="mb-1">
              Row {seat.row}, Column {seat.column}
            </li>
          ))}
        </ul>
        <div className="mb-6">
          <p className="text-terary-light">Price per seat: ${pricePerSeat}</p>
          <p className="text-accent font-bold">Total Price: ${totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <button
            className="py-2 px-4 rounded-lg bg-secondary-dark text-white hover:bg-accent hover:shadow-md transition-all duration-300"
            onClick={onCancel}
          >
            No, Cancel
          </button>
          <button
            className="py-2 px-4 rounded-lg bg-accent text-white hover:bg-secondary hover:shadow-md transition-all duration-300"
            onClick={onConfirm}
          >
            Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
