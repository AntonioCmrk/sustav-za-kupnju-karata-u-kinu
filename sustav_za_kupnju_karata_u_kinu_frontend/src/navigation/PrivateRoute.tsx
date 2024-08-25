import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../state/auth/authSlice";

const PrivateRoute = ({ children }: any) => {
  const { token, role } = useSelector(selectAuth);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  if (role !== "Admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
