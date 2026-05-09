import { Payment } from "../models/paymentModel.js";
import { Booking } from "../models/bookingModel.js";

export const createPayment = async (req, res) => {
  try {
    const { bookingId, transactionId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ status: false, message: "Booking not found" });
    }

    const adminCommission = Math.round(booking.fare * 0.2);
    const driverEarning = booking.fare - adminCommission;

    const payment = await Payment.create({
      bookingId,
      userId: req.user._id,
      driverId: booking.driverId,
      amount: booking.fare,
      paymentMethod: booking.paymentMethod,
      paymentStatus: "success",
      transactionId,
      adminCommission,
      driverEarning
    });

    booking.paymentStatus = "paid";
    await booking.save();

    return res.status(201).json({
      status: true,
      message: "Payment successful",
      data: payment
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const myPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "My payments fetched",
      data: payments
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const allPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("userId", "name email")
      .populate("driverId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "All payments fetched",
      data: payments
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};