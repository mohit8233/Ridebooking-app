import { useState } from "react";
import Layout from "../components/Layout.jsx";
import { bookingApi } from "../services/api.js";

export default function BookRide() {
  const [form, setForm] = useState({
    pickupAddress: "",
    dropAddress: "",
    distance: "",
    estimatedTime: "",
    paymentMethod: "cash",
  });
  const [fare, setFare] = useState(null);
  const [msg, setMsg] = useState("");

  async function estimate() {
    try {
      const res = await bookingApi.estimate({
        distance: Number(form.distance),
        estimatedTime: Number(form.estimatedTime),
      });
      setFare(res.data.fare || res.data.estimatedFare || res.data.data?.fare || 0);
    } catch {
      setFare(Number(form.distance || 0) * 15 + Number(form.estimatedTime || 0));
    }
  }

  async function book(e) {
    e.preventDefault();
    const payload = {
      ...form,
      distance: Number(form.distance),
      estimatedTime: Number(form.estimatedTime),
      fare: Number(fare || 0),
    };
    try {
      await bookingApi.create(payload);
      setMsg("Ride booked successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Booking failed. Check backend required fields.");
    }
  }

  return (
    <Layout title="Book a Ride" subtitle="Choose pickup, destination and payment method.">
      <section className="booking-layout">
        <form className="panel ride-form" onSubmit={book}>
          <label>Pickup address</label>
          <input value={form.pickupAddress} onChange={(e)=>setForm({...form,pickupAddress:e.target.value})} placeholder="Enter pickup location" />
          <label>Drop address</label>
          <input value={form.dropAddress} onChange={(e)=>setForm({...form,dropAddress:e.target.value})} placeholder="Enter destination" />
          <div className="form-grid">
            <div><label>Distance</label><input value={form.distance} onChange={(e)=>setForm({...form,distance:e.target.value})} placeholder="Km" /></div>
            <div><label>Time</label><input value={form.estimatedTime} onChange={(e)=>setForm({...form,estimatedTime:e.target.value})} placeholder="Minutes" /></div>
          </div>
          <label>Payment method</label>
          <select value={form.paymentMethod} onChange={(e)=>setForm({...form,paymentMethod:e.target.value})}>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
          <div className="form-actions">
            <button type="button" className="btn btn-white" onClick={estimate}>Estimate fare</button>
            <button className="btn btn-primary">Confirm booking</button>
          </div>
          {msg && <p className="message">{msg}</p>}
        </form>

        <aside className="fare-panel">
          <span>Estimated Fare</span>
          <strong>₹{fare ?? 0}</strong>
          <p>Fare is calculated from distance and estimated ride time.</p>
          <div className="fare-line"><span>Base fare</span><b>₹50</b></div>
          <div className="fare-line"><span>Distance charge</span><b>₹{Number(form.distance || 0) * 15}</b></div>
          <div className="fare-line"><span>Time charge</span><b>₹{Number(form.estimatedTime || 0)}</b></div>
        </aside>
      </section>
    </Layout>
  );
}
