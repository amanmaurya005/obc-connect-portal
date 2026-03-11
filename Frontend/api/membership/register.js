// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// import formidable from "formidable";
// import mongoose from "mongoose";
// import Membership from "../../models/membershipModel.js";

// const MONGODB_URI =
//   "mongodb+srv://manishrajora453:oguvsFmidQ1wVphn@cluster0.2twg0tz.mongodb.net/अखिल?retryWrites=true&w=majority&appName=Cluster0";

// async function connectDB() {
//   console.log("🔹 Checking DB connection");

//   if (mongoose.connections[0].readyState) {
//     console.log("✅ MongoDB already connected");
//     return;
//   }

//   console.log("🔹 Connecting MongoDB...");
//   await mongoose.connect(MONGODB_URI);
//   console.log("✅ MongoDB Connected Successfully");
// }

// export default async function handler(req, res) {
//   console.log("🚀 API Hit");
//   console.log("Request Method:", req.method);

//   if (req.method !== "POST") {
//     console.log("❌ Method not allowed");
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     console.log("🔹 Connecting DB...");
//     await connectDB();

//     console.log("🔹 Creating Formidable Instance");

//     const form = formidable({
//       multiples: false,
//       keepExtensions: true,
//     });

//     console.log("🔹 Parsing Form Data");

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error("❌ Form Parse Error:", err);

//         return res.status(500).json({
//           success: false,
//           message: "Form parsing failed",
//         });
//       }

//       console.log("✅ Form Parsed Successfully");
//       console.log("Fields:", fields);
//       console.log("Files:", files);

//       const cleanFields = {};

//       Object.keys(fields).forEach((key) => {
//         cleanFields[key] = Array.isArray(fields[key])
//           ? fields[key][0]
//           : fields[key];
//       });

//       console.log("🧹 Clean Fields:", cleanFields);

//       try {
//         console.log("🔹 Saving Data to MongoDB");

//         const member = await Membership.create({
//           ...cleanFields,
//           image: null,
//         });

//         console.log("✅ Data Saved Successfully:", member);

//         return res.status(200).json({
//           success: true,
//           message: "Membership registered successfully",
//           data: member,
//         });
//       } catch (dbError) {
//         console.error("❌ MongoDB Save Error:", dbError);

//         return res.status(500).json({
//           success: false,
//           message: dbError.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("❌ Register Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }





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
    receiptNumber: Number,
    memberName: String,
    fatherName: String,
    businessNature: String,
    organizationPosition: String,
    residenceAddress: String,
    officeAddress: String,
    residencePhone: String,
    officePhone: String,
    mobile: String,
    whatsapp: String,
    email: String,
    pan: String,
    aadhaar: String,
    education: String,
    otherEducation: String,
    dob: Date,
    marriageDate: Date,
    bloodGroup: String,
    tshirtSize: String,
    socialWork: String,
    specialAchievement: String,
    membershipType: String,
    membershipFee: {
      type: Number,
      default: 251,
    },
    state: String,
    district: String,
    vidhansabha: String,
    image: String,
  },
  { timestamps: true }
);

const Membership =
  mongoose.models.Membership ||
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
          image: null,
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