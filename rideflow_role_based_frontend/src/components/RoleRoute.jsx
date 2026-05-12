import { Navigate } from "react-router-dom";
import { getRole, getToken, roleHome } from "../utils/auth.js";

export default function RoleRoute({ children, allowed }) {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/login" replace />;

  if (allowed && !allowed.includes(role)) {
    return <Navigate to={roleHome(role)} replace />;
  }

  return children;
}
