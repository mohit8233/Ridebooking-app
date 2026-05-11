import { NavLink } from "react-router-dom";
import { LayoutDashboard, MapPinned, ClipboardList, Car, CreditCard, MessageSquare, User, Shield } from "lucide-react";

const items = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Book Ride", "/book-ride", MapPinned],
  ["Bookings", "/bookings", ClipboardList],
  ["Driver", "/driver", Car],
  ["Admin", "/admin", Shield],
  ["Vehicles", "/vehicles", Car],
  ["Payments", "/payments", CreditCard],
  ["Complaints", "/complaints", MessageSquare],
  ["Profile", "/profile", User],
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="side-title">Menu</p>
      {items.map(([label, path, Icon]) => (
        <NavLink key={path} to={path} className="side-link">
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
