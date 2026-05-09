import express from "express";
import { allPayments, createPayment, myPayments } from "../controllers/paymentController.js";
import { authMiddle } from "../middleware/authMiddleware.js";
import { adminMiddle } from "../middleware/adminMiddleware.js";

const payRouter = express.Router();

payRouter.post("/createPayment", authMiddle, createPayment);
payRouter.get("/myPayments", authMiddle, myPayments);
payRouter.get("/allPayments", authMiddle, adminMiddle, allPayments);

export default payRouter;