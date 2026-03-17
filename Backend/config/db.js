import mongoose from "mongoose";

// ✅ Cache database connection for serverless
let cachedDb = null;

const connectDB = async () => {
  try {
    // ✅ Agar already connected hai toh return
    if (cachedDb) {
      console.log("🔄 Using cached MongoDB connection");
      return cachedDb;
    }

    // ✅ Check MongoDB URI
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    console.log("🆕 Creating new MongoDB connection...");

    // ✅ Encode URI to handle special characters (like Hindi text)
    const encodedUri = encodeURI(mongoUri);

    // ✅ Mongoose 9.x mein sirf basic options
    const conn = await mongoose.connect(encodedUri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // ✅ Cache the connection
    cachedDb = conn;
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Don't exit process in serverless
    throw error;
  }
};

export default connectDB;