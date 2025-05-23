import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContextprovider";

function PrivateRoute({ children }) {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;
