import { Router } from "express";
import { login, register } from "../controllers/authController.js";

export const  userRouter = Router()


userRouter.post("/register",register);
userRouter.post("/login",login);