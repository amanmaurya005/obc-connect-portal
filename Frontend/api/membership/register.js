import formidable from "formidable";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import sgMail from "@sendgrid/mail";
import Razorpay from "razorpay";

// 1. Service Configurations using Environment Variables
cloudinary.config({                                                                                                                                                                                                                            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Disabling default parser for formidable
  },
};

/* ---------------- MONGOOSE SCHEMA & MODEL ---------------- */
const membershipSchema = new mongoose.Schema({
  receiptNumber: { type: Number, required: true, unique: true },
  membershipFee: { type: Number, default: 251 },
  memberName: { type: String, required: true, trim: true },
  fatherName: { type: String, required: true, trim: true },
  businessNature: String,
  organizationPosition: String,
  residenceAddress: { type: String, required: true },
  officeAddress: String,
  residencePhone: String,
  officePhone: String,
  mobile: { type: String, required: true },
  whatsapp: String,
  email: { type: String, lowercase: true, trim: true, default: null },
  pan: String,
  aadhaar: String,
  education: { type: String, required: true },
  otherEducation: String,
  dob: { type: Date, required: true },
  marriageDate: Date,
  bloodGroup: { type: String, required: true },
  tshirtSize: { type: String, required: true },
  socialWork: String,
  specialAchievement: String,
  membershipType: { type: String, default: "life" },
  state: { type: String, required: true },
  district: { type: String, required: true },
  vidhansabha: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Membership = mongoose.models.Membership || mongoose.model("Membership", membershipSchema);

/* ---------------- DATABASE CONNECT ---------------- */
async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI); // Using Env Var
}

/* ---------------- API HANDLER ---------------- */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    // Parse Form Data
    const data = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: false, keepExtensions: true });
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    // Clean Fields (convert arrays to strings)
    const cleanFields = {};
    Object.keys(fields).forEach((key) => {
      cleanFields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
    });

    // 2. Cloudinary Upload Logic 🚀
    let finalImageUrl = cleanFields.image || "";
    const file = files.imageFile ? (Array.isArray(files.imageFile) ? files.imageFile[0] : files.imageFile) : null;

    if (file && file.filepath) {
      const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
        folder: "obc_memberships",
      });
      finalImageUrl = uploadResponse.secure_url; // Real URL for DB
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: "Profile image is required" });
    }

    // 3. Generate Receipt Number
    const lastMember = await Membership.findOne({}, {}, { sort: { receiptNumber: -1 } });
    const newReceiptNumber = (lastMember?.receiptNumber || 0) + 1;

    // 4. Save to MongoDB
    const member = await Membership.create({
      ...cleanFields,
      receiptNumber: newReceiptNumber,
      image: finalImageUrl,
      dob: cleanFields.dob ? new Date(cleanFields.dob) : null,
      marriageDate: cleanFields.marriageDate ? new Date(cleanFields.marriageDate) : null,
    });

    // 5. Send Notification Email via SendGrid
    try {
      const emailMsg = {
        to: "info@obcmahasabha.co.in",
        from: "info@obcmahasabha.co.in", // Must be verified in SendGrid
        subject: `🆕 New Member: ${cleanFields.memberName}`,
        html: `<strong>New membership registered!</strong><br>Receipt No: ${newReceiptNumber}<br>Mobile: ${cleanFields.mobile}`,
      };
      await sgMail.send(emailMsg);
    } catch (mailError) {
      console.error("Email Error:", mailError);
      // We don't block the response even if email fails
    }

    return res.status(200).json({
      success: true,
      message: "Membership registered, Image uploaded, and Email sent!",
      data: member,
    });

  } catch (error) {
    console.error("❌ API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}