import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import { MapPinned, ClipboardList, CreditCard, MessageSquare } from "lucide-react";

export default function Dashboard() {
  return (
    <Layout title="User Dashboard" subtitle="User ko sirf booking, payments aur complaints dikhengi.">
      <section className="metrics">
        <Link className="metric" to="/book-ride"><MapPinned /><span>Book Ride</span><strong>Go</strong></Link>
        <Link className="metric" to="/bookings"><ClipboardList /><span>My Bookings</span><strong>View</strong></Link>
        <Link className="metric" to="/payments"><CreditCard /><span>My Payments</span><strong>Pay</strong></Link>
        <Link className="metric" to="/complaints"><MessageSquare /><span>Complaints</span><strong>Help</strong></Link>
      </section>
    </Layout>
  );
}
