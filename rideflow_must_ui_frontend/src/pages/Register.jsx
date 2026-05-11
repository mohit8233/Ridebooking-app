import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../services/api.js";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "", role: "user" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

 async function submit(e) {
  e.preventDefault();

  console.log("REGISTER FORM DATA:", form);

  setMsg("Creating account...");

  try {
    const res = await authApi.register(form);
    console.log("REGISTER SUCCESS:", res.data);
    setMsg(res.data.message || "Register successful");
    navigate("/login");
  } catch (err) {
    console.log("REGISTER ERROR:", err.response?.data);
    setMsg(err.response?.data?.message || "Registration failed");
  }
}

  return (
    <div className="auth-screen">
      <form className="auth-box" onSubmit={submit}>
        <Link className="auth-logo" to="/">RideFlow</Link>
        <h1>Create account</h1>
        <p>Start booking and managing rides.</p>
        <label>Name</label>
        <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Your name" />
        <label>Email</label>
        <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="you@example.com" />
        <label>Mobile</label>
        <input value={form.mobile} onChange={(e)=>setForm({...form,mobile:e.target.value})} placeholder="9876543210" />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} placeholder="Create password" />
        <label>Role</label>
        <select value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})}>
          <option value="user">User</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary full">Register</button>
        {msg && <p className="message">{msg}</p>}
        <p className="auth-foot">Already have account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
