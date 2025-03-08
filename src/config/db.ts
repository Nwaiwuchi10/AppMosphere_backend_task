import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(colors.green("✅ MongoDB Connected Successfully!"));
  } catch (error) {
    console.log(colors.red("❌ MongoDB Connection Error:"), error);
    process.exit(1);
  }
};

export default connectDB;
