import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { Navigate } from "react-router-dom";

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export const HideLinkOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return !isLoggedIn ? children : <Navigate to="/" />;
};

export default ShowOnLogin;
