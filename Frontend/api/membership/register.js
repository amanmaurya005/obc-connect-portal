export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  import formidable from "formidable";
  import fs from "fs";
  
  export default async function handler(req, res) {
  
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    try {
  
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
  
        console.log("📥 Fields:", fields);
        console.log("📷 Files:", files);
  
        // Example: image file access
        let imagePath = null;
  
        if (files.imageFile) {
          imagePath = files.imageFile.filepath;
        }
  
        // Yahan MongoDB save kar sakte ho
        // const member = await Member.create({...fields, image:imagePath})
  
        return res.status(200).json({
          success: true,
          message: "Membership registered successfully",
          fields,
          imagePath,
        });
  
      });
  
    } catch (error) {
  
      console.error("Register Error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Registration failed",
      });
  
    }
  }