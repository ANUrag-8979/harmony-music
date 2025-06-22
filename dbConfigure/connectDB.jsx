import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MONGO_URL);

export async function connectDB() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URL);

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected...');
    });

    connection.on('error', (err) => {
      console.error('MongoDB connection error!!!', err);
      process.exit(1);
    });

  } catch (error) {
    console.error("Something went wrong in DB connection");
    console.error(error);
    process.exit(1); // optional: terminate the app if DB connection fails
  }
}
