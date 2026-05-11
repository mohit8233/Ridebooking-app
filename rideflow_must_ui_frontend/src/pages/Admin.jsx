import Layout from "../components/Layout.jsx";
import { Users, Car, ClipboardList, IndianRupee } from "lucide-react";

export default function Admin() {
  return (
    <Layout title="Admin Dashboard" subtitle="Control users, drivers, vehicles, bookings and complaints.">
      <section className="metrics">
        <div className="metric"><Users /><span>Users</span><strong>148</strong></div>
        <div className="metric"><Car /><span>Drivers</span><strong>42</strong></div>
        <div className="metric"><ClipboardList /><span>Bookings</span><strong>360</strong></div>
        <div className="metric"><IndianRupee /><span>Revenue</span><strong>82k</strong></div>
      </section>
      <section className="panel table-card">
        <h2>Recent Admin Queue</h2>
        <table>
          <thead><tr><th>Task</th><th>Type</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Verify new vehicle</td><td>Vehicle</td><td><span className="status pending">pending</span></td></tr>
            <tr><td>Resolve payment issue</td><td>Payment</td><td><span className="status active">active</span></td></tr>
            <tr><td>Review complaint</td><td>Complaint</td><td><span className="status pending">pending</span></td></tr>
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
