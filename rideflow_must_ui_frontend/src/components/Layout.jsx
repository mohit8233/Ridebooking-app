import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ title, subtitle, children }) {
  return (
    <>
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="content">
          <div className="content-head">
            <div>
              <span className="kicker">RideFlow workspace</span>
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
