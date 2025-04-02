import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext ";

// A wrapper component to protect routes, only allowing access to authenticated users
const AuthenticatedLogin = ({children}) => {
  const { token } = useAuth();
  // console.log('token ==>', token)
  return token ? children : <Navigate to={"/"} />;
}

export default AuthenticatedLogin;