export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  import formidable from "formidable";
  
  export default async function handler(req, res) {
  
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    try {
  
      const form = new formidable.IncomingForm();
  
      form.parse(req, async (err, fields, files) => {
  
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Form parsing failed",
          });
        }
  
        console.log("📥 Fields:", fields);
        console.log("📷 Files:", files);
  
        // Yahan MongoDB save kar sakte ho
        // Abhi test ke liye response bhej rahe hain
  
        return res.status(200).json({
          success: true,
          message: "Membership registered successfully",
          data: fields,
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