// import serverless from "serverless-http";
// import app from "../Backend/index.js";

// export default serverless(app);



export default function handler(req, res) {
    console.log('API HIT:', req.url);
    
    // Test route
    if (req.url === '/test' || req.url === '/api/test') {
      res.status(200).json({ 
        success: true, 
        message: '✅ API 100% Working!',
        timestamp: new Date().toISOString()
      });
      return;
    }
    
    res.status(404).json({ error: 'Route not found' });
  }
  