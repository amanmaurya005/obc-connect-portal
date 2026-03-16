import mongoose from "mongoose";
import formidable from "formidable";
import { createMembership } from "../../Backend/controllers/membershipController.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectDB();

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {

    if (err) {
      return res.status(500).json({ message: "Form parsing error" });
    }

    req.body = fields;
    req.file = files.imageFile || null;

    return createMembership(req, res);

  });

}