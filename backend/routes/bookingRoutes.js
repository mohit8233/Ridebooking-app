import express from "express";
import {
  acceptBooking,
  cancelBooking,
  checkFareEstimate,
  completeRide,
  createBooking,
  getAllBookings,
  myBookings,
  startRide
} from "../controllers/bookingController.js";
import { authMiddle } from "../middleware/authMiddleware.js";
import { driverMiddle } from "../middleware/driverMiddleware.js";
import { adminMiddle } from "../middleware/adminMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/checkFareEstimate", authMiddle, checkFareEstimate);
bookingRouter.post("/createBooking", authMiddle, createBooking);

bookingRouter.get("/myBookings", authMiddle, myBookings);
bookingRouter.get("/getAllBookings", authMiddle, adminMiddle, getAllBookings);

bookingRouter.patch("/acceptBooking/:id", authMiddle, driverMiddle, acceptBooking);
bookingRouter.patch("/startRide/:id", authMiddle, driverMiddle, startRide);
bookingRouter.patch("/completeRide/:id", authMiddle, driverMiddle, completeRide);
bookingRouter.patch("/cancelBooking/:id", authMiddle, cancelBooking);

export default bookingRouter;