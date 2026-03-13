export default function handler(req, res) {

    if (req.method === "GET") {
      return res.status(200).json({
        message: "Backend working on Vercel 🚀"
      });
    }
  
    res.status(405).json({ message: "Method Not Allowed" });
  
  }