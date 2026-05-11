import { Routes, Route, Navigate } from "react-router-dom";
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

function Protected({ children }) {
  const token = localStorage.getItem("rideflow_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/book-ride" element={<Protected><BookRide /></Protected>} />
      <Route path="/bookings" element={<Protected><MyBookings /></Protected>} />
      <Route path="/driver" element={<Protected><Driver /></Protected>} />
      <Route path="/admin" element={<Protected><Admin /></Protected>} />
      <Route path="/vehicles" element={<Protected><Vehicles /></Protected>} />
      <Route path="/payments" element={<Protected><Payments /></Protected>} />
      <Route path="/complaints" element={<Protected><Complaints /></Protected>} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
