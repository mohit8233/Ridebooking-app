import Layout from "../components/Layout.jsx";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("rideflow_user") || "{}");

  return (
    <Layout title="Profile" subtitle="Your saved account details.">
      <section className="panel profile-card">
        <div className="avatar">{(user.name || "U").charAt(0).toUpperCase()}</div>
        <h2>{user.name || "User"}</h2>
        <p>{user.email || "No email saved"}</p>
        <div className="profile-list">
          <div><span>Mobile</span><b>{user.mobile || "-"}</b></div>
          <div><span>Role</span><b>{user.role || "-"}</b></div>
        </div>
      </section>
    </Layout>
  );
}
