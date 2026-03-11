export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from "formidable";
import mongoose from "mongoose";
import Membership from "../../models/membershipModel.js";

const MONGODB_URI = "mongodb+srv://manishrajora453:oguvsFmidQ1wVphn@cluster0.2twg0tz.mongodb.net/अखिल?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {

    await connectDB();

    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {

      if (err) {
        console.error("Form Parse Error:", err);
        return res.status(500).json({
          success: false,
          message: "Form parsing failed",
        });
      }

      const cleanFields = {};

      Object.keys(fields).forEach((key) => {
        cleanFields[key] = Array.isArray(fields[key])
          ? fields[key][0]
          : fields[key];
      });

      try {

        const member = await Membership.create({
          ...cleanFields,
          image: null
        });

        return res.status(200).json({
          success: true,
          message: "Membership registered successfully",
          data: member
        });

      } catch (dbError) {

        console.error("MongoDB Save Error:", dbError);

        return res.status(500).json({
          success: false,
          message: dbError.message
        });

      }

    });

  } catch (error) {

    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
}