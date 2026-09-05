import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("=================================");
    console.log("✅ MongoDB Atlas Connected");
    console.log(`📦 Database: ${connection.connection.name}`);
    console.log(`🌍 Host: ${connection.connection.host}`);
    console.log("=================================");
  } catch (error) {
    console.error("=================================");
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    console.log("=================================");

    process.exit(1);
  }
};

export default connectDatabase;