import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Status from "../components/Status.jsx";
import { Users, Car, ClipboardList, IndianRupee } from "lucide-react";
import { adminApi, bookingApi, vehicleApi } from "../services/api.js";

export default function Admin() {
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [driverId, setDriverId] = useState("");
  const [msg, setMsg] = useState("");

  const loadData = () => {
    adminApi.stats().then((res) => setStats(res.data.data || {}));
    bookingApi.all().then((res) => setBookings(res.data.data || [])).catch(() => setBookings([]));
    vehicleApi.all().then((res) => setVehicles(res.data.data || [])).catch(() => setVehicles([]));
  };

  useEffect(() => { loadData(); }, []);

  const approveDriver = () => {
    if (!driverId) return setMsg("Driver ID enter karo.");
    adminApi.approveDriver(driverId)
      .then((res) => setMsg(res.data.message || "Driver approved"))
      .catch((err) => setMsg(err.response?.data?.message || "Driver approve failed"));
  };

  const verifyVehicle = (id) => {
    vehicleApi.verify(id).then(() => loadData()).catch((err) => setMsg(err.response?.data?.message || "Vehicle verify failed"));
  };

  return (
    <Layout title="Admin Dashboard" subtitle="Admin ko sirf admin wali cheeze dikhengi.">
      <section className="metrics">
        <div className="metric"><Users /><span>Users</span><strong>{stats.totalUsers || 0}</strong></div>
        <div className="metric"><Car /><span>Drivers</span><strong>{stats.totalDrivers || 0}</strong></div>
        <div className="metric"><ClipboardList /><span>Bookings</span><strong>{stats.totalBookings || 0}</strong></div>
        <div className="metric"><IndianRupee /><span>Revenue</span><strong>₹{stats.totalRevenue || 0}</strong></div>
      </section>

      <section className="grid-2">
        <div className="panel">
          <h2>Approve Driver</h2>
          <label>Driver MongoDB ID</label>
          <input value={driverId} onChange={(e)=>setDriverId(e.target.value)} placeholder="driver user _id paste karo" />
          <button className="btn btn-primary" onClick={approveDriver}>Approve Driver</button>
          {msg && <p className="message">{msg}</p>}
        </div>
        <div className="panel">
          <h2>Stats</h2>
          <p>Pending Drivers: <b>{stats.pendingDrivers || 0}</b></p>
          <p>Completed Bookings: <b>{stats.completedBookings || 0}</b></p>
          <p>Cancelled Bookings: <b>{stats.cancelledBookings || 0}</b></p>
          <p>Pending Complaints: <b>{stats.pendingComplaints || 0}</b></p>
        </div>
      </section>

      <section className="panel table-card" style={{marginTop:20}}>
        <h2>All Bookings</h2>
        <table>
          <thead><tr><th>ID</th><th>User</th><th>Pickup</th><th>Drop</th><th>Fare</th><th>Status</th></tr></thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}><td>{b._id}</td><td>{b.userId?.name || "-"}</td><td>{b.pickupAddress}</td><td>{b.dropAddress}</td><td>₹{b.fare}</td><td><Status>{b.status}</Status></td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel table-card" style={{marginTop:20}}>
        <h2>Vehicle Verification</h2>
        <table>
          <thead><tr><th>ID</th><th>Driver</th><th>Vehicle</th><th>Number</th><th>Verified</th><th>Action</th></tr></thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id}>
                <td>{v._id}</td><td>{v.driverId?.name || "-"}</td><td>{v.vehicleName}</td><td>{v.vehicleNumber}</td><td><Status>{v.isVerified ? "verified" : "pending"}</Status></td>
                <td>{!v.isVerified && <button className="btn btn-soft" onClick={()=>verifyVehicle(v._id)}>Verify</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
