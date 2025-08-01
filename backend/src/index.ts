import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./route/authRoutes";
import noteRoutes from "./route/noteRoutes";
import dashboardRoutes from "./route/dashboardRoutes";

dotenv.config();

const app = express();
const allowedOrigins = [
  "https://assignment-highway-delite.vercel.app", // frontend deployed
  "http://localhost:5173" // dev
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200 
  })
);

app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use("/api/auth",authRoutes);
app.use("/api/notes",noteRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req:Request,res:Response) => {
    res.json({ message: "Server started"});
});


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`)})
}).catch(err => console.error(err))
