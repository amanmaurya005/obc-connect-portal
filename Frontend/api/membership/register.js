export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from "formidable";
import mongoose from "mongoose";
import Membership from "../../models/membershipModel.js"; // path check karo

const MONGODB_URI = process.env.MONGO_URI;

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

      let imagePath = null;

      if (files.imageFile) {
        imagePath = files.imageFile.filepath;
      }

      try {

        const member = await Member.create({
          ...fields,
          image: imagePath,
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
          message: "Database save failed",
        });

      }

    });

  } catch (error) {

    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });

  }
}