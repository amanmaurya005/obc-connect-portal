import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const adminLogin = async (req, res) => {
  try {
    console.log("🔐 Login endpoint hit");
    console.log("Request body:", req.body);
    
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );
    
    console.log("Token generated, setting cookie...");
    
    // ✅ Set cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: false,  // Set to false for local development (HTTP)
      sameSite: 'lax', // Use 'lax' for development
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    });
    
    console.log("Cookie set successfully");
    
    res.json({
      success: true,
      user: { id: admin._id, email: admin.email, name: admin.name }
    });
    
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    console.log("🔐 Verify endpoint hit");
    console.log("Cookies received:", req.cookies);  // ✅ Debug log
    
    // Get token from cookie
    const token = req.cookies?.adminToken;
    
    console.log("Token from cookie:", token ? "Present" : "Missing");
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Admin not found' 
      });
    }
    
    res.json({
      success: true,
      user: admin
    });
    
  } catch (error) {
    console.error('❌ Verify error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    console.log("🔐 Logout endpoint hit");
    
    // Clear the cookie
    res.clearCookie('adminToken', {
      httpOnly: true,
      secure: false,  // Set to false for local development
      sameSite: 'lax',
      path: '/'
    });
    
    console.log("Cookie cleared");
    
    res.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ✅ Add Change Password Function
export const changePassword = async (req, res) => {
  try {
    console.log("🔐 Change password endpoint hit");
    
    const { currentPassword, newPassword } = req.body;
    
    const token = req.cookies?.adminToken;
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(404).json({ 
        success: false, 
        message: 'Admin not found' 
      });
    }
    
    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
    if (!isValidPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    admin.password = hashedPassword;
    await admin.save();
    
    console.log('✅ Password changed for:', admin.email);
    
    res.json({ 
      success: true, 
      message: 'Password changed successfully' 
    });
    
  } catch (error) {
    console.error('❌ Change password error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};