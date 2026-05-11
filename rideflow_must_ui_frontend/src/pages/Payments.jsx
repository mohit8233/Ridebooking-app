import Layout from "../components/Layout.jsx";

export default function Payments() {
  return (
    <Layout title="Payments" subtitle="View payment history and transaction status.">
      <section className="panel table-card">
        <table>
          <thead><tr><th>Booking</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>#RF1024</td><td>₹520</td><td>Cash</td><td><span className="status active">success</span></td></tr>
            <tr><td>#RF1025</td><td>₹240</td><td>Online</td><td><span className="status pending">pending</span></td></tr>
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
