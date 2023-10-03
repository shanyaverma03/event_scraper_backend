import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_CONNECT || "mongodb://localhost:27017/Events"
    );
    console.log("MongoDB is connected!!!");
  } catch (err) {
    console.error(err.message);
  }
};
