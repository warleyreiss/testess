import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = ( {children}) => {
  const { signed } = useContext(AuthContext);
  console.log(signed)
  return signed ? <Navigate to="/service/view" />: <Navigate to="/login" />;
};
