import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../state/auth/authSlice";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { token } = useSelector(selectAuth);

  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
