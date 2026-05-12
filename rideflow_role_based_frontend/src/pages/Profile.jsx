import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { authApi } from "../services/api.js";
import { getUser } from "../utils/auth.js";

export default function Profile() {
  const [profile, setProfile] = useState(getUser());
  const [msg, setMsg] = useState("");

  useEffect(() => {
    authApi.profile()
      .then((res) => setProfile(res.data.data || getUser()))
      .catch((err) => setMsg(err.response?.data?.message || "Profile load failed"));
  }, []);

  return (
    <Layout title="Profile" subtitle="Logged in user details.">
      <section className="panel profile-card">
        <div className="avatar">{profile?.name?.[0] || "U"}</div>
        <h2>{profile?.name}</h2>
        <p>{profile?.role}</p>
        <div className="profile-list">
          <div><span>Email</span><b>{profile?.email}</b></div>
          <div><span>Mobile</span><b>{profile?.mobile}</b></div>
          <div><span>Approved</span><b>{String(profile?.isApproved)}</b></div>
          <div><span>Blocked</span><b>{String(profile?.isBlocked)}</b></div>
        </div>
        {msg && <p className="message">{msg}</p>}
      </section>
    </Layout>
  );
}
