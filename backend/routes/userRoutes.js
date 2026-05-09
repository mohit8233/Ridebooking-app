import { Router } from "express";
import { login, profile, register } from "../controllers/authController.js";
import { authMiddle } from "../middleware/authMiddleware.js";

export const  userRouter = Router()


userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/profile",authMiddle,profile)