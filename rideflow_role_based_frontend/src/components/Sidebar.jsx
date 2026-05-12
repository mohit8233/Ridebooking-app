import { NavLink } from "react-router-dom";
import { LayoutDashboard, MapPinned, ClipboardList, Car, CreditCard, MessageSquare, User, Shield } from "lucide-react";
import { getRole } from "../utils/auth.js";

const allItems = {
  admin: [
    ["Admin Dashboard", "/admin", Shield],
    ["All Vehicles", "/vehicles", Car],
    ["All Payments", "/payments", CreditCard],
    ["All Complaints", "/complaints", MessageSquare],
    ["Profile", "/profile", User],
  ],
  driver: [
    ["Driver Panel", "/driver", LayoutDashboard],
    ["My Vehicles", "/vehicles", Car],
    ["Profile", "/profile", User],
  ],
  user: [
    ["Dashboard", "/dashboard", LayoutDashboard],
    ["Book Ride", "/book-ride", MapPinned],
    ["My Bookings", "/bookings", ClipboardList],
    ["My Payments", "/payments", CreditCard],
    ["My Complaints", "/complaints", MessageSquare],
    ["Profile", "/profile", User],
  ],
};

export default function Sidebar() {
  const role = getRole();
  const items = allItems[role] || [];

  return (
    <aside className="sidebar">
      <p className="side-title">{role || "Menu"} Menu</p>
      {items.map(([label, path, Icon]) => (
        <NavLink key={path} to={path} className="side-link">
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
