import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    amount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      default: "cash"
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending"
    },

    transactionId: String,

    adminCommission: {
      type: Number,
      default: 0
    },

    driverEarning: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);