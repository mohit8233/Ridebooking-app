import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Status from "../components/Status.jsx";
import { complaintApi } from "../services/api.js";
import { getRole } from "../utils/auth.js";

export default function Complaints() {
  const role = getRole();
  const [complaints, setComplaints] = useState([]);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ bookingId: "", driverId: "", subject: "", message: "" });

  const load = () => {
    const apiCall = role === "admin" ? complaintApi.all : complaintApi.mine;
    apiCall().then((res) => setComplaints(res.data.data || [])).catch((err) => setMsg(err.response?.data?.message || "Complaint load failed"));
  };

  useEffect(() => { load(); }, []);

  const create = (e) => {
    e.preventDefault();
    const payload = { subject: form.subject, message: form.message };
    if (form.bookingId) payload.bookingId = form.bookingId;
    if (form.driverId) payload.driverId = form.driverId;
    complaintApi.create(payload).then((res) => { setMsg(res.data.message || "Complaint created"); load(); }).catch((err) => setMsg(err.response?.data?.message || "Complaint failed"));
  };

  const resolve = (id) => {
    complaintApi.resolve(id).then(() => load()).catch((err) => setMsg(err.response?.data?.message || "Resolve failed"));
  };

  return (
    <Layout title={role === "admin" ? "All Complaints" : "My Complaints"} subtitle={role === "admin" ? "Admin complaints resolve karega." : "User complaint create/dekh sakta hai."}>
      {role === "user" && (
        <form className="panel" onSubmit={create}>
          <h2>Create Complaint</h2>
          <div className="form-grid">
            <div><label>Booking ID optional</label><input value={form.bookingId} onChange={(e)=>setForm({...form,bookingId:e.target.value})} /></div>
            <div><label>Driver ID optional</label><input value={form.driverId} onChange={(e)=>setForm({...form,driverId:e.target.value})} /></div>
          </div>
          <label>Subject</label><input value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} />
          <label>Message</label><textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} />
          <button className="btn btn-primary">Submit Complaint</button>
        </form>
      )}
      {msg && <p className="message">{msg}</p>}
      <section className="panel table-card" style={{marginTop:20}}>
        <table><thead><tr><th>ID</th><th>User</th><th>Subject</th><th>Message</th><th>Status</th><th>Action</th></tr></thead><tbody>
          {complaints.map((c)=>(<tr key={c._id}><td>{c._id}</td><td>{c.userId?.name || "Me"}</td><td>{c.subject}</td><td>{c.message}</td><td><Status>{c.status}</Status></td><td>{role === "admin" && c.status !== "resolved" && <button className="btn btn-soft" onClick={()=>resolve(c._id)}>Resolve</button>}</td></tr>))}
        </tbody></table>
      </section>
    </Layout>
  );
}
