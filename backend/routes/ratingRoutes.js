import express from "express";
import { createRating, driverRatings } from "../controllers/ratingController.js";
import { authMiddle } from "../middleware/authMiddleware.js";

export const ratingRouter = express.Router();

ratingRouter.post("/createRating", authMiddle, createRating);
ratingRouter.get("/driverRatings/:driverId", driverRatings);

