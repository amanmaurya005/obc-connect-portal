import express from 'express';
import { adminLogin, adminLogout, changePassword, verifyAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/verify', verifyAdmin);
router.post('/logout', adminLogout);
router.post('/change-password', changePassword);  

export default router;