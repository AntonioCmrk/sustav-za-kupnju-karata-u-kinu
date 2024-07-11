import { Toaster } from "react-hot-toast";
import "./App.css";
import { MainLayout } from "./layout/MainLayout";
import { NavigationRoutes } from "./navigation/NavigationRoutes";

function App() {
  return (
    <>
      <MainLayout>
        <NavigationRoutes />
        <Toaster />
      </MainLayout>
    </>
  );
}

export default App;
