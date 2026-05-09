import express from "express";
import {
  allComplaints,
  createComplaint,
  myComplaints,
  resolveComplaint
} from "../controllers/complainController.js";
import { authMiddle } from "../middleware/authMiddleware.js";
import { adminMiddle } from "../middleware/adminMiddleware.js";

const complainRouter = express.Router();

complainRouter.post("/createComplaint", authMiddle, createComplaint);
complainRouter.get("/myComplaints", authMiddle, myComplaints);
complainRouter.get("/allComplaints", authMiddle, adminMiddle, allComplaints);
complainRouter.patch("/resolveComplaint/:id", authMiddle, adminMiddle, resolveComplaint);

export default complainRouter;