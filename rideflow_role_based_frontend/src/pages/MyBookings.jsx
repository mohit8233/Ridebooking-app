import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Status from "../components/Status.jsx";
import { bookingApi } from "../services/api.js";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [msg, setMsg] = useState("");

  const load = () => {
    bookingApi.mine()
      .then((res) => setBookings(res.data.data || []))
      .catch((err) => setMsg(err.response?.data?.message || "Bookings load failed"));
  };

  useEffect(() => { load(); }, []);

  const cancel = (id) => {
    bookingApi.cancel(id).then(() => load()).catch((err) => setMsg(err.response?.data?.message || "Cancel failed"));
  };

  return (
    <Layout title="My Bookings" subtitle="User apni bookings dekhega.">
      {msg && <p className="message">{msg}</p>}
      <section className="panel table-card">
        <table>
          <thead><tr><th>ID</th><th>Vehicle</th><th>Pickup</th><th>Drop</th><th>Fare</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b._id}</td><td>{b.vehicleId?.vehicleName || b.vehicleId?._id || "-"}</td><td>{b.pickupAddress}</td><td>{b.dropAddress}</td><td>₹{b.fare}</td><td>{b.paymentMethod}</td><td><Status>{b.status}</Status></td>
                <td>{b.status !== "cancelled" && b.status !== "completed" && <button className="btn btn-soft" onClick={()=>cancel(b._id)}>Cancel</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
