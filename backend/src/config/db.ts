import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Failed to connect to Database",error);
        process.exit(1);
    }
}