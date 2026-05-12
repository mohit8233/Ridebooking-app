import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../services/api.js";
import { roleHome, saveAuth } from "../utils/auth.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setMsg("Logging in...");

    authApi.login(form)
      .then((res) => {
        const token = res.data.token;
        const user = res.data.user;

        if (!token || !user) {
          setMsg("Backend se token ya user data nahi mila.");
          return;
        }

        saveAuth(token, user);
        navigate(roleHome(user.role));
      })
      .catch((err) => {
        setMsg(err.response?.data?.message || "Login failed. Email/password check karo.");
      });
  };

  return (
    <div className="auth-screen">
      <form className="auth-box" onSubmit={submit}>
        <Link className="auth-logo" to="/">RideFlow</Link>
        <h1>Welcome back</h1>
        <p>Login ke baad role ke hisaab se page open hoga.</p>
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
