import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/PrimaryButton";

export const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="text-3xl p-5 font-bold text-primary">Error</div>
      <PrimaryButton onClick={() => navigate("/")} text="Back" />
    </div>
  );
};
