import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
console.log('provate route')
  const { signed } = useContext(AuthContext)
  return signed ? <Outlet/>:<Navigate to='/login'/>;

};
