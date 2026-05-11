import { useState } from "react";
import Layout from "../components/Layout.jsx";
import { vehicleApi } from "../services/api.js";

export default function Driver() {
  const [form, setForm] = useState({
    vehicleType: "car",
    vehicleName: "",
    vehicleNumber: "",
    vehicleColor: "",
    seatingCapacity: 4,
    baseFare: 50,
    perKmRate: 15,
    perMinuteRate: 1,
  });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await vehicleApi.create(form);
      setMsg("Vehicle added successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Unable to add vehicle.");
    }
  }

  return (
    <Layout title="Driver Panel" subtitle="Register your vehicle and manage driver profile.">
      <section className="grid-2">
        <form className="panel ride-form" onSubmit={submit}>
          <div className="form-grid">
            <div><label>Vehicle type</label><select value={form.vehicleType} onChange={(e)=>setForm({...form,vehicleType:e.target.value})}><option>bike</option><option>auto</option><option>car</option><option>suv</option></select></div>
            <div><label>Vehicle name</label><input value={form.vehicleName} onChange={(e)=>setForm({...form,vehicleName:e.target.value})} placeholder="Swift Dzire" /></div>
          </div>
          <div className="form-grid">
            <div><label>Vehicle number</label><input value={form.vehicleNumber} onChange={(e)=>setForm({...form,vehicleNumber:e.target.value})} placeholder="MP09AB1234" /></div>
            <div><label>Color</label><input value={form.vehicleColor} onChange={(e)=>setForm({...form,vehicleColor:e.target.value})} placeholder="White" /></div>
          </div>
          <div className="form-grid">
            <div><label>Base fare</label><input value={form.baseFare} onChange={(e)=>setForm({...form,baseFare:Number(e.target.value)})} /></div>
            <div><label>Per km rate</label><input value={form.perKmRate} onChange={(e)=>setForm({...form,perKmRate:Number(e.target.value)})} /></div>
          </div>
          <button className="btn btn-primary">Save vehicle</button>
          {msg && <p className="message">{msg}</p>}
        </form>

        <div className="panel">
          <h2>Driver Status</h2>
          <div className="driver-card">
            <strong>Verification pending</strong>
            <p>Admin approval is required before accepting ride requests.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
