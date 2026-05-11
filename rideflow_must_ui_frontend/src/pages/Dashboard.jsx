import Layout from "../components/Layout.jsx";
import { MapPinned, Wallet, Clock, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("rideflow_user") || "{}");

  return (
    <Layout title="Dashboard" subtitle={`Welcome ${user.name || "back"}, here is your ride overview.`}>
      <section className="metrics">
        <div className="metric"><MapPinned /><span>Total rides</span><strong>28</strong></div>
        <div className="metric"><CheckCircle2 /><span>Completed</span><strong>22</strong></div>
        <div className="metric"><Clock /><span>Pending</span><strong>4</strong></div>
        <div className="metric"><Wallet /><span>Total spent</span><strong>₹7,840</strong></div>
      </section>

      <section className="grid-2">
        <div className="panel">
          <h2>Current Ride</h2>
          <div className="current-ride">
            <div><span>Pickup</span><b>Railway Station</b></div>
            <div><span>Drop</span><b>City Center Mall</b></div>
            <div><span>Driver</span><b>Rohit Sharma</b></div>
            <div><span>Fare</span><b>₹240</b></div>
          </div>
        </div>
        <div className="panel">
          <h2>Recent Activity</h2>
          <ul className="activity">
            <li><span></span> Ride completed to Airport Road</li>
            <li><span></span> Payment received successfully</li>
            <li><span></span> Complaint resolved by admin</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
