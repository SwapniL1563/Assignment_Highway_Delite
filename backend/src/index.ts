import express from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", function (req,res) {
    res.json("Server started")
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`)
})