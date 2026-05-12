import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BookRide from "./pages/BookRide.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Driver from "./pages/Driver.jsx";
import Admin from "./pages/Admin.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import Payments from "./pages/Payments.jsx";
import Complaints from "./pages/Complaints.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import RoleRoute from "./components/RoleRoute.jsx";
import RoleRedirect from "./components/RoleRedirect.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<RoleRoute allowed={["user"]}><Dashboard /></RoleRoute>} />
      <Route path="/book-ride" element={<RoleRoute allowed={["user"]}><BookRide /></RoleRoute>} />
      <Route path="/bookings" element={<RoleRoute allowed={["user"]}><MyBookings /></RoleRoute>} />
      <Route path="/payments" element={<RoleRoute allowed={["user", "admin"]}><Payments /></RoleRoute>} />
      <Route path="/complaints" element={<RoleRoute allowed={["user", "admin"]}><Complaints /></RoleRoute>} />

      <Route path="/driver" element={<RoleRoute allowed={["driver"]}><Driver /></RoleRoute>} />
      <Route path="/vehicles" element={<RoleRoute allowed={["driver", "admin"]}><Vehicles /></RoleRoute>} />

      <Route path="/admin" element={<RoleRoute allowed={["admin"]}><Admin /></RoleRoute>} />
      <Route path="/profile" element={<RoleRoute allowed={["user", "driver", "admin"]}><Profile /></RoleRoute>} />
      <Route path="/go" element={<RoleRedirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
