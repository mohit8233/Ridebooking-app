import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Status from "../components/Status.jsx";
import { vehicleApi } from "../services/api.js";
import { getRole } from "../utils/auth.js";

export default function Vehicles() {
  const role = getRole();
  const [vehicles, setVehicles] = useState([]);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ vehicleType: "car", vehicleName: "", vehicleNumber: "", vehicleColor: "", seatingCapacity: 4, baseFare: "", perKmRate: "", perMinuteRate: 1 });

  const load = () => {
    const apiCall = role === "admin" ? vehicleApi.all : vehicleApi.mine;
    apiCall().then((res) => setVehicles(res.data.data || [])).catch((err) => setMsg(err.response?.data?.message || "Vehicle load failed"));
  };

  useEffect(() => { load(); }, []);

  const createVehicle = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      seatingCapacity: Number(form.seatingCapacity),
      baseFare: Number(form.baseFare),
      perKmRate: Number(form.perKmRate),
      perMinuteRate: Number(form.perMinuteRate),
    };

    vehicleApi.create(payload)
      .then((res) => {
        setMsg(res.data.message || "Vehicle created. Admin verification ka wait karo.");
        setForm({ vehicleType: "car", vehicleName: "", vehicleNumber: "", vehicleColor: "", seatingCapacity: 4, baseFare: "", perKmRate: "", perMinuteRate: 1 });
        load();
      })
      .catch((err) => setMsg(err.response?.data?.message || "Vehicle create failed"));
  };

  const verify = (id) => {
    vehicleApi.verify(id).then(() => load()).catch((err) => setMsg(err.response?.data?.message || "Verify failed"));
  };

  return (
    <Layout title={role === "admin" ? "All Vehicles" : "My Vehicles"} subtitle={role === "admin" ? "Admin vehicles verify karega." : "Driver apni vehicle add karega."}>
      {role === "driver" && (
        <form className="panel ride-form" onSubmit={createVehicle}>
          <h2>Add Vehicle</h2>
          <div className="form-grid">
            <div><label>Type</label><select value={form.vehicleType} onChange={(e)=>setForm({...form,vehicleType:e.target.value})}><option value="bike">Bike</option><option value="auto">Auto</option><option value="car">Car</option><option value="suv">SUV</option></select></div>
            <div><label>Name</label><input value={form.vehicleName} onChange={(e)=>setForm({...form,vehicleName:e.target.value})} placeholder="Swift Dzire" /></div>
            <div><label>Number</label><input value={form.vehicleNumber} onChange={(e)=>setForm({...form,vehicleNumber:e.target.value})} placeholder="GJ01AB1234" /></div>
            <div><label>Color</label><input value={form.vehicleColor} onChange={(e)=>setForm({...form,vehicleColor:e.target.value})} placeholder="White" /></div>
            <div><label>Seating</label><input value={form.seatingCapacity} onChange={(e)=>setForm({...form,seatingCapacity:e.target.value})} /></div>
            <div><label>Base Fare</label><input value={form.baseFare} onChange={(e)=>setForm({...form,baseFare:e.target.value})} /></div>
            <div><label>Per KM Rate</label><input value={form.perKmRate} onChange={(e)=>setForm({...form,perKmRate:e.target.value})} /></div>
            <div><label>Per Minute Rate</label><input value={form.perMinuteRate} onChange={(e)=>setForm({...form,perMinuteRate:e.target.value})} /></div>
          </div>
          <button className="btn btn-primary">Create Vehicle</button>
        </form>
      )}

      {msg && <p className="message">{msg}</p>}

      <section className="panel table-card" style={{marginTop:20}}>
        <h2>{role === "admin" ? "All Vehicles" : "My Vehicle List"}</h2>
        <table>
          <thead><tr><th>ID</th><th>Driver</th><th>Vehicle</th><th>Number</th><th>Fare</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id}>
                <td>{v._id}</td>
                <td>{v.driverId?.name || "Me"}</td>
                <td>{v.vehicleName} ({v.vehicleType})</td>
                <td>{v.vehicleNumber}</td>
                <td>₹{v.baseFare} + ₹{v.perKmRate}/km</td>
                <td><Status>{v.isVerified ? "verified" : "pending"}</Status></td>
                <td>{role === "admin" && !v.isVerified && <button className="btn btn-soft" onClick={()=>verify(v._id)}>Verify</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
