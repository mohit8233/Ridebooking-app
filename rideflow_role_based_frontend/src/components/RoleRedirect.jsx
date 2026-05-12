import { Navigate } from "react-router-dom";
import { getRole, getToken, roleHome } from "../utils/auth.js";

export default function RoleRedirect() {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return <Navigate to={roleHome(getRole())} replace />;
}
