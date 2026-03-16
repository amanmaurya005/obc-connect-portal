// import serverless from "serverless-http";
// import app from "../Backend/index.js";

// export default serverless(app);




export default function handler(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    
    console.log('HIT:', path);
    
    if (path === '/api/test' || path === '/test') {
      res.json({ 
        success: true, 
        message: '✅ API Working 100%!',
        path: path 
      });
      return;
    }
    
    res.status(404).json({ error: 'Not found', path: path });
  }
  