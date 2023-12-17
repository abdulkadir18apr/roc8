import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  console.log(children);
  const location=useLocation()
    const isAuthenticated=useSelector((state)=>state.auth.isLogin);
    console.log(isAuthenticated)
    return isAuthenticated ? children : <Navigate to={{pathname:"/" ,state:location}}/>;
  };