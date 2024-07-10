import { ReactNode } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden center items-center bg-quaternary-light">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
