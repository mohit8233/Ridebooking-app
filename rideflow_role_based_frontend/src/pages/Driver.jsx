import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Status from "../components/Status.jsx";
import { bookingApi, vehicleApi } from "../services/api.js";

export default function Driver() {
  const [vehicles, setVehicles] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [msg, setMsg] = useState("");

  const loadVehicles = () => {
    vehicleApi.mine()
      .then((res) => setVehicles(res.data.data || []))
      .catch((err) => setMsg(err.response?.data?.message || "Vehicles load failed"));
  };

  useEffect(() => { loadVehicles(); }, []);

  const action = (type) => {
    if (!bookingId) return setMsg("Booking ID enter karo.");
    const call = type === "accept" ? bookingApi.accept : type === "start" ? bookingApi.start : bookingApi.complete;
    call(bookingId)
      .then((res) => setMsg(res.data.message || "Ride updated"))
      .catch((err) => setMsg(err.response?.data?.message || "Action failed"));
  };

  return (
    <Layout title="Driver Panel" subtitle="Driver ko vehicle aur ride actions dikhengi.">
      <section className="grid-2">
        <div className="panel">
          <h2>Ride Action</h2>
          <p className="muted">Backend me driver ke liye pending booking list endpoint nahi hai, isliye booking ID se accept/start/complete kar sakte ho.</p>
          <label>Booking ID</label>
          <input value={bookingId} onChange={(e)=>setBookingId(e.target.value)} placeholder="booking _id paste karo" />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={()=>action("accept")}>Accept</button>
            <button className="btn btn-soft" onClick={()=>action("start")}>Start</button>
            <button className="btn btn-white" onClick={()=>action("complete")}>Complete</button>
          </div>
          {msg && <p className="message">{msg}</p>}
        </div>
        <div className="panel">
          <h2>My Vehicles</h2>
          {vehicles.map((v) => (
            <div className="driver-card" key={v._id}>
              <b>{v.vehicleName} - {v.vehicleNumber}</b>
              <p>{v.vehicleType} • ₹{v.baseFare} base • ₹{v.perKmRate}/km</p>
              <Status>{v.isVerified ? "verified" : "pending"}</Status>
            </div>
          ))}
          {!vehicles.length && <p>No vehicle added.</p>}
        </div>
      </section>
    </Layout>
  );
}
