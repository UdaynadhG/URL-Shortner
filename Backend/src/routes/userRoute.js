import express from 'express';
import { login, validateUser, verifyOtp } from '../controllers/authController.js';

const router = express.Router();


router.post('/validate', validateUser);
router.post('/verifyOtp', verifyOtp);
router.post('/login', login);

export default router;
