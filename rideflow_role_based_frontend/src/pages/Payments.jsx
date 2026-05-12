import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Status from "../components/Status.jsx";
import { paymentApi } from "../services/api.js";
import { getRole } from "../utils/auth.js";

export default function Payments() {
  const role = getRole();
  const [payments, setPayments] = useState([]);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ bookingId: "", amount: "", paymentMethod: "cash", transactionId: "" });

  const load = () => {
    const apiCall = role === "admin" ? paymentApi.all : paymentApi.mine;
    apiCall().then((res) => setPayments(res.data.data || [])).catch((err) => setMsg(err.response?.data?.message || "Payment load failed"));
  };

  useEffect(() => { load(); }, []);

  const create = (e) => {
    e.preventDefault();
    paymentApi.create({ ...form, amount: Number(form.amount) })
      .then((res) => { setMsg(res.data.message || "Payment created"); load(); })
      .catch((err) => setMsg(err.response?.data?.message || "Payment failed"));
  };

  return (
    <Layout title={role === "admin" ? "All Payments" : "My Payments"} subtitle={role === "admin" ? "Admin all payments dekhega." : "User apni payment create/dekh sakta hai."}>
      {role === "user" && (
        <form className="panel" onSubmit={create}>
          <h2>Create Payment</h2>
          <div className="form-grid">
            <div><label>Booking ID</label><input value={form.bookingId} onChange={(e)=>setForm({...form,bookingId:e.target.value})} /></div>
            <div><label>Amount</label><input value={form.amount} onChange={(e)=>setForm({...form,amount:e.target.value})} /></div>
            <div><label>Method</label><select value={form.paymentMethod} onChange={(e)=>setForm({...form,paymentMethod:e.target.value})}><option value="cash">Cash</option><option value="online">Online</option></select></div>
            <div><label>Transaction ID</label><input value={form.transactionId} onChange={(e)=>setForm({...form,transactionId:e.target.value})} /></div>
          </div>
          <button className="btn btn-primary">Pay</button>
        </form>
      )}
      {msg && <p className="message">{msg}</p>}
      <section className="panel table-card" style={{marginTop:20}}>
        <table><thead><tr><th>ID</th><th>Booking</th><th>User</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead><tbody>
          {payments.map((p)=>(<tr key={p._id}><td>{p._id}</td><td>{p.bookingId?._id || p.bookingId}</td><td>{p.userId?.name || "Me"}</td><td>₹{p.amount}</td><td>{p.paymentMethod}</td><td><Status>{p.paymentStatus}</Status></td></tr>))}
        </tbody></table>
      </section>
    </Layout>
  );
}
