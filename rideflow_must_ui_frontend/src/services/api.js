import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("rideflow_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

export const authApi = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  profile: () => api.get("/auth/profile"),
};

export const bookingApi = {
  estimate: (data) => api.post("/bookings/checkFareEstimate", data),
  create: (data) => api.post("/bookings/createBooking", data),
  mine: () => api.get("/bookings/myBookings"),
  all: () => api.get("/bookings/getAllBookings"),
  accept: (id) => api.patch(`/bookings/acceptBooking/${id}`),
  start: (id) => api.patch(`/bookings/startRide/${id}`),
  complete: (id) => api.patch(`/bookings/completeRide/${id}`),
  cancel: (id) => api.patch(`/bookings/cancelBooking/${id}`),
};

export const vehicleApi = {
  create: (data) => api.post("/vehicles/createVehicle", data),
  mine: () => api.get("/vehicles/myVehicles"),
  all: () => api.get("/vehicles/getAllVehicles"),
  verify: (id) => api.patch(`/vehicles/verifyVehicle/${id}`),
};

export const paymentApi = {
  create: (data) => api.post("/payments/createPayment", data),
  mine: () => api.get("/payments/myPayments"),
  all: () => api.get("/payments/allPayments"),
};

export const complaintApi = {
  create: (data) => api.post("/complaints/createComplaint", data),
  mine: () => api.get("/complaints/myComplaints"),
  all: () => api.get("/complaints/allComplaints"),
  resolve: (id) => api.patch(`/complaints/resolveComplaint/${id}`),
};

export const adminApi = {
  stats: () => api.get("/admin/dashboardStats"),
  approveDriver: (id) => api.patch(`/admin/approveDriver/${id}`),
};
