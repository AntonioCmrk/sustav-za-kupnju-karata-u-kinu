import React from "react";
import { Home } from "../pages/Home";
import { Error } from "../pages/Error";
import { Route, Routes } from "react-router-dom";

export const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
