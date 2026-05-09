import express from "express";
import {
  createVehicle,
  getAllVehicles,
  myVehicles,
  verifyVehicle
} from "../controllers/vehicleController.js";
import { authMiddle } from "../middleware/authMiddleware.js";
import { driverMiddle } from "../middleware/driverMiddleware.js";
import { adminMiddle } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/createVehicle", authMiddle, driverMiddle, createVehicle);
router.get("/getAllVehicles", authMiddle, adminMiddle, getAllVehicles);
router.get("/myVehicles", authMiddle, driverMiddle, myVehicles);
router.patch("/verifyVehicle/:id", authMiddle, adminMiddle, verifyVehicle);

export default router;