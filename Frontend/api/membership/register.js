export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from "formidable";
import mongoose from "mongoose";

const MONGODB_URI="mongodb+srv://manishrajora453:oguvsFmidQ1wVphn@cluster0.2twg0tz.mongodb.net/अखिल?retryWrites=true&w=majority&appName=Cluster0";


/* ---------------- MONGOOSE SCHEMA ---------------- */



const membershipSchema = new mongoose.Schema(
{
  receiptNumber: {
    type: Number,
    required: true,
    unique: true,
  },

  membershipFee: {
    type: Number,
    default: 251,
    min: 0,
  },

  memberName: {
    type: String,
    required: [true, "Member name is required"],
    trim: true,
  },

  fatherName: {
    type: String,
    required: [true, "Father name is required"],
    trim: true,
  },

  businessNature: String,
  organizationPosition: String,

  residenceAddress: {
    type: String,
    required: [true, "Residence address is required"],
  },

  officeAddress: String,

  residencePhone: String,
  officePhone: String,

  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
  },

  whatsapp: String,

  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: null,
  },

  pan: String,
  aadhaar: String,

  education: {
    type: String,
    required: [true, "Education is required"],
  },

  otherEducation: String,

  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },

  marriageDate: Date,

  bloodGroup: {
    type: String,
    required: [true, "Blood group is required"],
  },

  tshirtSize: {
    type: String,
    required: [true, "T-shirt size is required"],
  },

  socialWork: String,
  specialAchievement: String,

  membershipType: {
    type: String,
    default: "life",
  },

  state: {
    type: String,
    required: [true, "State is required"],
  },

  district: {
    type: String,
    required: [true, "District is required"],
  },

  vidhansabha: {
    type: String,
    required: [true, "Vidhansabha is required"],
  },

  image: {
    type: String,
    required: [true, "Profile image is required"],
  },
},
{
  timestamps: true,
}
);

// Vercel serverless fix
export default mongoose.models.Membership ||
mongoose.model("Membership", membershipSchema);

/* ---------------- DATABASE CONNECT ---------------- */

async function connectDB() {
  console.log("🔹 Checking DB connection");

  if (mongoose.connections[0].readyState) {
    console.log("✅ MongoDB already connected");
    return;
  }

  console.log("🔹 Connecting MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ MongoDB Connected Successfully");
}


/* ---------------- API HANDLER ---------------- */

export default async function handler(req, res) {
  console.log("🚀 API Hit");

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
        console.error("❌ Form Parse Error:", err);

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
          image: imagePath,
        });

        return res.status(200).json({
          success: true,
          message: "Membership registered successfully",
          data: member,
        });

      } catch (dbError) {

        console.error("❌ MongoDB Save Error:", dbError);

        return res.status(500).json({
          success: false,
          message: dbError.message,
        });

      }

    });

  } catch (error) {

    console.error("❌ Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}