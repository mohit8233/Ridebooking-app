import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { ArrowRight, MapPin, ShieldCheck, Clock3, Star, CarFront, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="hero-left">
            <span className="hero-badge">Reliable rides for everyday travel</span>
            <h1>Move around your city with a smoother ride booking experience.</h1>
            <p className="hero-text">
              A modern cab booking interface built like a real product: clean landing page, dashboards,
              driver panel, admin screens, payments and complaints.
            </p>
            <div className="hero-buttons">
              <Link className="btn btn-primary btn-lg" to="/book-ride">Book a ride <ArrowRight size={18} /></Link>
              <Link className="btn btn-white btn-lg" to="/register">Create account</Link>
            </div>
            <div className="trust-row">
              <div><strong>10k+</strong><span>Rides</span></div>
              <div><strong>4.8</strong><span>Rating</span></div>
              <div><strong>24/7</strong><span>Support</span></div>
            </div>
          </div>

          <div className="hero-card">
            <div className="phone-card">
              <div className="ride-top">
                <span className="dot-live"></span>
                Live booking
              </div>
              <h3>Where are you going?</h3>
              <div className="route-box">
                <div><MapPin size={18} /><span>Current location</span></div>
                <div><MapPin size={18} /><span>City Center Mall</span></div>
              </div>
              <div className="vehicle-options">
                <div className="vehicle active"><CarFront /><span>Mini</span><b>₹180</b></div>
                <div className="vehicle"><CarFront /><span>Sedan</span><b>₹240</b></div>
                <div className="vehicle"><CarFront /><span>SUV</span><b>₹360</b></div>
              </div>
              <button className="btn btn-primary full">Confirm Ride</button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <span className="kicker">Why RideFlow</span>
            <h2>A complete ride booking website UI</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card"><Clock3 /><h3>Fast booking</h3><p>Simple pickup, drop, fare estimate and booking flow.</p></div>
            <div className="feature-card"><ShieldCheck /><h3>Verified drivers</h3><p>Vehicle verification and driver workflow for real operations.</p></div>
            <div className="feature-card"><Smartphone /><h3>Mobile ready</h3><p>Responsive layout that works nicely on phone, tablet and desktop.</p></div>
            <div className="feature-card"><Star /><h3>Admin control</h3><p>Admin screens for vehicles, payments, complaints and overview.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
