import "./App.css";
import { MainLayout } from "./layout/MainLayout";
import { NavigationRoutes } from "./navigation/NavigationRoutes";

function App() {
  return (
    <>
      <MainLayout>
        <NavigationRoutes />
      </MainLayout>
    </>
  );
}

export default App;
