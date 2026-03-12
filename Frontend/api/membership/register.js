// import formidable from "formidable";
// import mongoose from "mongoose";


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const MONGODB_URI = "mongodb+srv://manishrajora453:oguvsFmidQ1wVphn@cluster0.2twg0tz.mongodb.net/अखिल?retryWrites=true&w=majority&appName=Cluster0";


// const membershipSchema = new mongoose.Schema({
//   receiptNumber: { type: Number, required: true, unique: true },
//   membershipFee: { type: Number, default: 251 },
//   memberName: { type: String, required: true, trim: true },
//   fatherName: { type: String, required: true, trim: true },
//   businessNature: String,
//   organizationPosition: String,
//   residenceAddress: { type: String, required: true },
//   officeAddress: String,
//   residencePhone: String,
//   officePhone: String,
//   mobile: { type: String, required: true },
//   whatsapp: String,
//   email: { type: String, lowercase: true, trim: true, default: null },
//   pan: String,
//   aadhaar: String,
//   education: { type: String, required: true },
//   otherEducation: String,
//   dob: { type: Date, required: true },
//   marriageDate: Date,
//   bloodGroup: { type: String, required: true },
//   tshirtSize: { type: String, required: true },
//   socialWork: String,
//   specialAchievement: String,
//   membershipType: { type: String, default: "life" },
//   state: { type: String, required: true },
//   district: { type: String, required: true },
//   vidhansabha: { type: String, required: true },
//   image: { type: String, required: true },
// }, { timestamps: true });


// const Membership = mongoose.models.Membership || mongoose.model("Membership", membershipSchema);

// /* ---------------- DATABASE CONNECT --------------- */
// async function connectDB() {
//   if (mongoose.connections[0].readyState) return;
//   await mongoose.connect(MONGODB_URI);
// }

// /* ---------------- API HANDLER ---------------- */
// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     await connectDB();

//     // Use a Promise to handle formidable in serverless environment
//     const data = await new Promise((resolve, reject) => {
//       const form = formidable({ multiples: false, keepExtensions: true });
//       form.parse(req, (err, fields, files) => {
//         if (err) reject(err);
//         resolve({ fields, files });
//       });
//     });

//     const { fields, files } = data;

//     // Clean Fields (Formidable returns values in arrays)
//     const cleanFields = {};
//     Object.keys(fields).forEach((key) => {
//       cleanFields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
//     });

//     // Fix: Get image path/filename
//     let imagePath = cleanFields.image || "";
//     if (files.imageFile) {
//         // In production, you should upload this to Cloudinary/S3
//         imagePath = Array.isArray(files.imageFile) 
//             ? files.imageFile[0].newFilename 
//             : files.imageFile.newFilename;
//     }

//     if (!imagePath && !cleanFields.image) {
//         return res.status(400).json({ success: false, message: "Profile image is required" });
//     }

//     // Fix: Generate Receipt Number
//     const lastMember = await Membership.findOne({}, {}, { sort: { receiptNumber: -1 } });
//     const newReceiptNumber = (lastMember?.receiptNumber || 0) + 1;

//     // Save to DB
//     const member = await Membership.create({
//       ...cleanFields,
//       receiptNumber: newReceiptNumber,
//       image: imagePath,
//       dob: cleanFields.dob ? new Date(cleanFields.dob) : null,
//       marriageDate: cleanFields.marriageDate ? new Date(cleanFields.marriageDate) : null,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Membership registered successfully",
//       data: member,
//     });

//   } catch (error) {
//     console.error("❌ API Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// }








import formidable from "formidable";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import sgMail from "@sendgrid/mail";

/* ---------------- SERVICE CONFIG ---------------- */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

/* ---------------- MONGOOSE SCHEMA ---------------- */

const membershipSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Membership =
  mongoose.models.Membership ||
  mongoose.model("Membership", membershipSchema);

/* ---------------- DATABASE CONNECT ---------------- */

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
}

/* ---------------- API HANDLER ---------------- */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    /* -------- FORM DATA PARSE -------- */

    const data = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: false, keepExtensions: true });

      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    /* -------- CLEAN FIELDS -------- */

    const cleanFields = {};
    Object.keys(fields).forEach((key) => {
      cleanFields[key] = Array.isArray(fields[key])
        ? fields[key][0]
        : fields[key];
    });

    /* -------- IMAGE UPLOAD -------- */

    let finalImageUrl = cleanFields.image || "";

    const file = files.imageFile
      ? Array.isArray(files.imageFile)
        ? files.imageFile[0]
        : files.imageFile
      : null;

    if (file && file.filepath) {
      const upload = await cloudinary.uploader.upload(file.filepath, {
        folder: "obc_memberships",
      });

      finalImageUrl = upload.secure_url;
    }

    if (!finalImageUrl) {
      return res.status(400).json({
        success: false,
        message: "Profile image required",
      });
    }

    /* -------- RECEIPT NUMBER -------- */

    const lastMember = await Membership.findOne(
      {},
      {},
      { sort: { receiptNumber: -1 } }
    );

    const newReceiptNumber = (lastMember?.receiptNumber || 0) + 1;

    /* -------- SAVE MEMBER -------- */

    const member = await Membership.create({
      ...cleanFields,

      receiptNumber: newReceiptNumber,
      image: finalImageUrl,

      dob: cleanFields.dob ? new Date(cleanFields.dob) : null,
      marriageDate: cleanFields.marriageDate
        ? new Date(cleanFields.marriageDate)
        : null,
    });

    /* -------- ADMIN EMAIL -------- */

    try {
      const msg = {
        to: "info@obcmahasabha.co.in",
        from: "info@obcmahasabha.co.in",
        subject: `🆕 New Member: ${cleanFields.memberName}`,
        html: `
        <h3>New Membership Registered</h3>
        <p><b>Name:</b> ${cleanFields.memberName}</p>
        <p><b>Mobile:</b> ${cleanFields.mobile}</p>
        <p><b>Receipt No:</b> ${newReceiptNumber}</p>
        `,
      };

      await sgMail.send(msg);
    } catch (mailError) {
      console.error("Email error:", mailError);
    }

    /* -------- RESPONSE -------- */

    return res.status(200).json({
      success: true,
      message: "Membership registered successfully",
      data: member,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}