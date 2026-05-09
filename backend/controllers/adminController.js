import { User } from "../models/userModel.js";
import { Booking } from "../models/bookingModel.js";
import { Payment } from "../models/paymentModel.js";
import { Complain } from "../models/complainModel.js";

export const dashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalDrivers = await User.countDocuments({ role: "driver" });
    const pendingDrivers = await User.countDocuments({ role: "driver", isApproved: false });
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: "completed" });
    const cancelledBookings = await Booking.countDocuments({ status: "cancelled" });
    const pendingComplaints = await Complain.countDocuments({ status: "pending" });

    const revenue = await Payment.aggregate([
      { $match: { paymentStatus: "success" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
    ]);

    return res.status(200).json({
      status: true,
      message: "Dashboard stats fetched",
      data: {
        totalUsers,
        totalDrivers,
        pendingDrivers,
        totalBookings,
        completedBookings,
        cancelledBookings,
        pendingComplaints,
        totalRevenue: revenue[0]?.totalRevenue || 0
      }
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const approveDriver = async (req, res) => {
  try {
    const driver = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      status: true,
      message: "Driver approved",
      data: driver
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};