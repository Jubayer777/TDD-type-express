import mongoose from "mongoose";

const connectDB = async (DATABASE_URL: string) => {
  try {
    const DB_OPTIONS = {
      dbName: "expressTypeTDD",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connection successful");
  } catch (error: any) {
    console.log("Connection failed", error.message);
  }
};

export default connectDB;
