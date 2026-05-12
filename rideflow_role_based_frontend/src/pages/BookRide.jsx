import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";

import { bookingApi, vehicleApi } from "../services/api.js";
export default function BookRide() {
  const [form, setForm] = useState({
    vehicleId: "",
    pickupAddress: "",
    dropAddress: "",
    distance: "",
    estimatedTime: "",
    paymentMethod: "cash",
  });

  const [fare, setFare] = useState(null);
  const [msg, setMsg] = useState("");
  const [vehicles, setVehicles] = useState([]);

useEffect(() => {
  vehicleApi
    .available()
    .then((res) => {
      console.log("AVAILABLE VEHICLES =>", res.data);
      setVehicles(res.data.data || []);
    })
    .catch((err) => {
      console.log("VEHICLE ERROR =>", err.response?.data);
      setVehicles([]);
    });
}, []);
  const estimate = () => {
    if (!form.vehicleId) {
      return setMsg("Please select vehicle first");
    }

    bookingApi
      .estimate({
        vehicleId: form.vehicleId,
        distance: Number(form.distance),
        estimatedTime: Number(form.estimatedTime),
      })
      .then((res) => {
        setFare(res.data.fare || 0);
        setMsg("");
      })
      .catch((err) => {
        setMsg(
          err.response?.data?.message || "Fare estimate failed"
        );
      });
  };

  const book = (e) => {
    e.preventDefault();

    if (!form.vehicleId) {
      return setMsg("Please select vehicle first");
    }

    const payload = {
      ...form,
      distance: Number(form.distance),
      estimatedTime: Number(form.estimatedTime),
    };

    bookingApi
      .create(payload)
      .then((res) => {
        setMsg(res.data.message || "Booking created");
      })
      .catch((err) => {
        setMsg(err.response?.data?.message || "Booking failed");
      });
  };

  return (
    <Layout
      title="Book a Ride"
      subtitle="User ko sirf ride booking aur apni bookings dikhengi."
    >
      <section className="booking-layout">
        <form className="panel ride-form" onSubmit={book}>
          <label>Select Vehicle</label>

          <select
            value={form.vehicleId}
            onChange={(e) =>
              setForm({
                ...form,
                vehicleId: e.target.value,
              })
            }
            required
          >
            <option value="">Choose available vehicle</option>

            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.vehicleType} - {vehicle.vehicleNumber}
              </option>
            ))}
          </select>

          <label>Pickup address</label>
          <input
            value={form.pickupAddress}
            onChange={(e) =>
              setForm({
                ...form,
                pickupAddress: e.target.value,
              })
            }
            placeholder="Enter pickup location"
          />

          <label>Drop address</label>
          <input
            value={form.dropAddress}
            onChange={(e) =>
              setForm({
                ...form,
                dropAddress: e.target.value,
              })
            }
            placeholder="Enter destination"
          />

          <div className="form-grid">
            <div>
              <label>Distance KM</label>
              <input
                value={form.distance}
                onChange={(e) =>
                  setForm({
                    ...form,
                    distance: e.target.value,
                  })
                }
                placeholder="12"
              />
            </div>

            <div>
              <label>Time Minutes</label>
              <input
                value={form.estimatedTime}
                onChange={(e) =>
                  setForm({
                    ...form,
                    estimatedTime: e.target.value,
                  })
                }
                placeholder="30"
              />
            </div>
          </div>

          <label>Payment</label>
          <select
            value={form.paymentMethod}
            onChange={(e) =>
              setForm({
                ...form,
                paymentMethod: e.target.value,
              })
            }
          >
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-soft"
              onClick={estimate}
            >
              Check Fare
            </button>

            <button className="btn btn-primary">
              Book Ride
            </button>
          </div>

          {msg && <p className="message">{msg}</p>}
        </form>

        <aside className="fare-panel">
          <span>Estimated Fare</span>
          <strong>₹{fare || 0}</strong>
          <p>
            Vehicle select karne par backend ko vehicleId
            automatically jayegi.
          </p>
        </aside>
      </section>
    </Layout>
  );
}