import { Rating } from "../models/ratingModel.js";
import { Booking } from "../models/bookingModel.js";

export const createRating = async (req, res) => {
  try {
    const { bookingId, rating, review } = req.body;

    const booking = await Booking.findOne({
      _id: bookingId,
      userId: req.user._id,
      status: "completed"
    });

    if (!booking) {
      return res.status(400).json({
        status: false,
        message: "Completed booking not found"
      });
    }

    const alreadyRated = await Rating.findOne({ bookingId });

    if (alreadyRated) {
      return res.status(400).json({
        status: false,
        message: "Already rated this booking"
      });
    }

    const newRating = await Rating.create({
      bookingId,
      userId: req.user._id,
      driverId: booking.driverId,
      rating,
      review
    });

    return res.status(201).json({
      status: true,
      message: "Rating created",
      data: newRating
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const driverRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ driverId: req.params.driverId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "Driver ratings fetched",
      data: ratings
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};