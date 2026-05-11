import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../services/api.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMsg("Logging in...");
    try {
      const res = await authApi.login(form);
      const token = res.data.token || res.data?.data?.token;
      const user = res.data.user || res.data?.data?.user;
      if (token) localStorage.setItem("rideflow_token", token);
      if (user) localStorage.setItem("rideflow_user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed. Check backend or credentials.");
    }
  }

  return (
    <div className="auth-screen">
      <form className="auth-box" onSubmit={submit}>
        <Link className="auth-logo" to="/">RideFlow</Link>
        <h1>Welcome back</h1>
        <p>Login to manage your rides.</p>
        <label>Email</label>
        <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="you@example.com" />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} placeholder="••••••••" />
        <button className="btn btn-primary full">Login</button>
        {msg && <p className="message">{msg}</p>}
        <p className="auth-foot">No account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
