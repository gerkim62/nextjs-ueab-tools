import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error(`could not connect mongodb:`, error);
  }
};

export default connectMongoDB