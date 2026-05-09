import { Booking } from "../models/bookingModel.js";
import { Vehicle } from "../models/vehicleModel.js";
import { calculateFare } from "../utils/fareCalculator.js";

export const checkFareEstimate = async (req, res) => {
    try {
        const { vehicleId, distance, estimatedTime } = req.body;
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                status: false,
                message: "Vehicle not found"
            });
        }

        const fare = calculateFare(
            vehicle.baseFare,
            Number(distance),
            vehicle.perKmRate,
            Number(estimatedTime),
            vehicle.perMinuteRate
        );

        return res.status(200).json({
            status: true,
            message: "Fare calculated",
            fare
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


export const createBooking = async (req, res) => {
    try {
        const { vehicleId, pickupAddress, dropAddress, distance, estimatedTime, paymentMethod } = req.body;

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle || !vehicle.isVerified || !vehicle.isActive) {
            return res.status(400).json({
                status: false,
                message: "Vehicle not available"
            });
        }

        const fare = calculateFare(
            vehicle.baseFare,
            Number(distance),
            vehicle.perKmRate,
            Number(estimatedTime),
            vehicle.perMinuteRate
        );


        const booking = await Booking.create({
            userId: req.user._id,
            vehicleId,
            pickupAddress,
            dropAddress,
            distance,
            estimatedTime,
            fare,
            paymentMethod,
            status: "pending",
            paymentStatus: "pending"
        })

        return res.status(201).json({
            status: true,
            message: "Booking created",
            data: booking
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}


export const myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("driverId", "name email mobile")
      .populate("vehicleId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "My bookings fetched",
      data: bookings
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};


export const getAllBookings = async(req,res)=>{
      try {
    const bookings = await Booking.find()
      .populate("userId", "name email mobile")
      .populate("driverId", "name email mobile")
      .populate("vehicleId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "All bookings fetched",
      data: bookings
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}

export const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ status: false, message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ status: false, message: "Booking already handled" });
    }

    booking.driverId = req.user._id;
    booking.status = "accepted";
    await booking.save();

    return res.status(200).json({
      status: true,
      message: "Booking accepted",
      data: booking
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};


export const startRide = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      driverId: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ status: false, message: "Booking not found" });
    }

    booking.status = "started";
    await booking.save();

    return res.status(200).json({
      status: true,
      message: "Ride started",
      data: booking
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const completeRide = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      driverId: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ status: false, message: "Booking not found" });
    }

    booking.status = "completed";

    if (booking.paymentMethod === "cash") {
      booking.paymentStatus = "paid";
    }

    await booking.save();

    return res.status(200).json({
      status: true,
      message: "Ride completed",
      data: booking
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { cancelReason } = req.body;

    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ status: false, message: "Booking not found" });
    }

    if (booking.status === "started" || booking.status === "completed") {
      return res.status(400).json({
        status: false,
        message: "Cannot cancel started or completed ride"
      });
    }

    booking.status = "cancelled";
    booking.cancelReason = cancelReason || "User cancelled";
    await booking.save();

    return res.status(200).json({
      status: true,
      message: "Booking cancelled",
      data: booking
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};