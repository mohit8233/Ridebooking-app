import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle"
    },

    pickupAddress: {
      type: String,
      required: true
    },

    dropAddress: {
      type: String,
      required: true
    },

    distance: {
      type: Number,
      required: true
    },

    estimatedTime: {
      type: Number,
      required: true
    },

    fare: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "arrived", "started", "completed", "cancelled", "rejected"],
      default: "pending"
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      default: "cash"
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending"
    },

    cancelReason: String
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);