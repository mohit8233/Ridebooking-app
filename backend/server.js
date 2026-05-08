import express from 'express'

import cors from 'cors'

import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { userRouter } from './routes/userRoutes.js';
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

await connectDB()
app.use("/api/auth",userRouter)

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})