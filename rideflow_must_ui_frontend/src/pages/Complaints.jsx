import { useState } from "react";
import Layout from "../components/Layout.jsx";
import { complaintApi } from "../services/api.js";

export default function Complaints() {
  const [form, setForm] = useState({ subject: "", message: "" });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await complaintApi.create(form);
      setMsg("Complaint submitted successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Unable to submit complaint.");
    }
  }

  return (
    <Layout title="Complaints" subtitle="Raise a support request or track existing issues.">
      <form className="panel ride-form" onSubmit={submit}>
        <label>Subject</label>
        <input value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} placeholder="Payment issue" />
        <label>Message</label>
        <textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} placeholder="Write your complaint..." />
        <button className="btn btn-primary">Submit complaint</button>
        {msg && <p className="message">{msg}</p>}
      </form>
    </Layout>
  );
}
