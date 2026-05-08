import { Router } from "express";
import { register } from "../controllers/authController.js";

export const  userRouter = Router()


userRouter.post("/register",register)