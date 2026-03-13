// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.log("DB Error:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";


let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error.message);
    throw error;
  }
};

export default connectDB;