import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB ulandi:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB xato:", err.message);
    process.exit(1);
  }
}
