import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, CarTaxiFront } from "lucide-react";
import { useState } from "react";
import { clearAuth, getRole, getToken, roleHome } from "../utils/auth.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const role = getRole();

  const logout = () => {
    clearAuth();
    navigate("/");
  };

  const roleItems = {
    admin: [
      ["Admin", "/admin"],
      ["Vehicles", "/vehicles"],
      ["Payments", "/payments"],
      ["Complaints", "/complaints"],
      ["Profile", "/profile"],
    ],
    driver: [
      ["Driver", "/driver"],
      ["My Vehicles", "/vehicles"],
      ["Profile", "/profile"],
    ],
    user: [
      ["Dashboard", "/dashboard"],
      ["Book Ride", "/book-ride"],
      ["Bookings", "/bookings"],
      ["Payments", "/payments"],
      ["Complaints", "/complaints"],
      ["Profile", "/profile"],
    ],
  };

  const navItems = token ? roleItems[role] || [] : [["Home", "/"]];

  return (
    <header className="navbar">
      <Link className="logo" to={token ? roleHome(role) : "/"}>
        <span><CarTaxiFront size={22} /></span>
        RideFlow
      </Link>

      <nav className={`navlinks ${open ? "show" : ""}`}>
        {navItems.map(([label, path]) => (
          <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
      </nav>

      <div className="nav-actions">
        {token ? (
          <>
            <span className="role-badge">{role}</span>
            <button className="btn btn-soft" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-ghost" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Sign up</Link>
          </>
        )}
        <button className="menu-btn" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
