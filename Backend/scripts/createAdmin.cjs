// // Backend/scripts/createAdmin.cjs
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');

// dotenv.config();

// // Admin Schema
// const adminSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: String
// }, { timestamps: true });

// const Admin = mongoose.model('Admin', adminSchema);

// const createAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
//     console.log('✅ Connected to MongoDB');
    
//     await Admin.deleteMany({ email: 'admin@obcmahasabha.co.in' });
//     console.log('🗑️ Deleted existing admin');
    
//     const hashedPassword = await bcrypt.hash('Admin@123456', 10);
    
//     const admin = new Admin({
//       name: 'Super Admin',
//       email: 'admin@obcmahasabha.co.in',
//       password: hashedPassword,
//       role: 'admin'
//     });
    
//     await admin.save();
    
//     console.log('\n✅ Admin created successfully!');
//     console.log('📧 Email: admin@obcmahasabha.co.in');
//     console.log('🔑 Password: Admin@123456');
    
//     process.exit();
//   } catch (error) {
//     console.error('❌ Error:', error);
//     process.exit(1);
//   }
// };

// createAdmin();