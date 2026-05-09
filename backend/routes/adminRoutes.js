import express from "express";
import { approveDriver, dashboardStats } from "../controllers/adminController.js";
import { authMiddle } from "../middleware/authMiddleware.js";
import { adminMiddle } from "../middleware/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.get("/dashboardStats", authMiddle, adminMiddle, dashboardStats);
adminRouter.patch("/approveDriver/:id", authMiddle, adminMiddle, approveDriver);

export default adminRouter;