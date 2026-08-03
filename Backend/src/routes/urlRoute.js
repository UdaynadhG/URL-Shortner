import express from 'express';
import { urlShortner,urlRedirect } from '../controllers/urlController.js';
import { protect } from '../middleware/authRequest.js';

const router = express.Router();

router.post('/shorten', protect, urlShortner);
router.get('/decode/:id', urlRedirect);

export default router;
