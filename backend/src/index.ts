import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./route/authRoutes";
import noteRoutes from "./route/noteRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/auth",authRoutes);
app.use("/api/notes",noteRoutes);

app.get("/", (req:Request,res:Response) => {
    res.json({ message: "Server started"});
});


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`)})
}).catch(err => console.error(err))
