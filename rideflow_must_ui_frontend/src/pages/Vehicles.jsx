import Layout from "../components/Layout.jsx";

export default function Vehicles() {
  return (
    <Layout title="Vehicles" subtitle="Manage driver vehicles and verification status.">
      <section className="panel table-card">
        <table>
          <thead><tr><th>Vehicle</th><th>Number</th><th>Driver</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Swift Dzire</td><td>MP09AB1234</td><td>Rohit</td><td><span className="status active">verified</span></td></tr>
            <tr><td>Honda Activa</td><td>MP09XY4411</td><td>Amit</td><td><span className="status pending">pending</span></td></tr>
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
