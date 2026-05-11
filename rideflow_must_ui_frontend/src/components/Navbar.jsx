import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, CarTaxiFront } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("rideflow_token");

  const logout = () => {
    localStorage.removeItem("rideflow_token");
    localStorage.removeItem("rideflow_user");
    navigate("/");
  };

  const navItems = [
    ["Dashboard", "/dashboard"],
    ["Book Ride", "/book-ride"],
    ["Bookings", "/bookings"],
    ["Driver", "/driver"],
    ["Admin", "/admin"],
  ];

  return (
    <header className="navbar">
      <Link className="logo" to="/">
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
          <button className="btn btn-soft" onClick={logout}>Logout</button>
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
