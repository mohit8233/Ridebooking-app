import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Status from "../components/Status.jsx";
import { bookingApi } from "../services/api.js";

export default function MyBookings() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    bookingApi.mine()
      .then((res) => setItems(res.data.bookings || res.data.data || res.data || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <Layout title="My Bookings" subtitle="Track your previous and active bookings.">
      <section className="panel table-card">
        <table>
          <thead><tr><th>Pickup</th><th>Drop</th><th>Fare</th><th>Status</th></tr></thead>
          <tbody>
            {items.length ? items.map((b) => (
              <tr key={b._id || b.id}>
                <td>{b.pickupAddress || "-"}</td>
                <td>{b.dropAddress || "-"}</td>
                <td>₹{b.fare || 0}</td>
                <td><Status>{b.status}</Status></td>
              </tr>
            )) : (
              <tr><td colSpan="4">No bookings found from backend.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
