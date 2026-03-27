import express from 'express';
import { adminLogin, adminLogout, verifyAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/verify', verifyAdmin);
router.post('/logout', adminLogout); 

export default router;