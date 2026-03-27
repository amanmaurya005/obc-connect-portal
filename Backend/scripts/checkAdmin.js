// import mongoose from 'mongoose';
// import Admin from '../models/Admin.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const checkAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('✅ Connected to MongoDB');
    
//     const admins = await Admin.find({});
    
//     console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
//     console.log(`Total Admins: ${admins.length}`);
//     console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
//     if (admins.length === 0) {
//       console.log('❌ No admin found!');
//     } else {
//       admins.forEach((admin, index) => {
//         console.log(`${index + 1}. Email: ${admin.email}`);
//         console.log(`   Name: ${admin.name}`);
//         console.log(`   Role: ${admin.role}`);
//         console.log(`   ID: ${admin._id}`);
//         console.log('---');
//       });
//     }
    
//     process.exit();
//   } catch (error) {
//     console.error('❌ Error:', error);
//     process.exit(1);
//   }
// };

// checkAdmin();