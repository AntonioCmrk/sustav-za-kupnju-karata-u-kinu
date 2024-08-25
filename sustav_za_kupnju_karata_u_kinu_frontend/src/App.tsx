import { Toaster } from "react-hot-toast";
import "./App.css";
import { MainLayout } from "./layout/MainLayout";
import { NavigationRoutes } from "./navigation/NavigationRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeAuth } from "./state/auth/authSlice";

function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
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
