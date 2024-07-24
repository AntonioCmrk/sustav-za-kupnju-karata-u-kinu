import { Toaster } from "react-hot-toast";
import "./App.css";
import { MainLayout } from "./layout/MainLayout";
import { NavigationRoutes } from "./navigation/NavigationRoutes";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <NavigationRoutes />
        <Toaster />
      </MainLayout>
    </QueryClientProvider>
  );
}

export default App;
