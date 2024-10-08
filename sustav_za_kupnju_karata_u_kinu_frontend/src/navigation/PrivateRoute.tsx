import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../state/auth/authSlice";

const PrivateRoute = ({ children }: any) => {
  const { token } = useSelector(selectAuth);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default PrivateRoute;
