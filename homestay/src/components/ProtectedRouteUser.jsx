import { Navigate } from "react-router-dom";

const ProtectedRouteUser = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRouteUser;
