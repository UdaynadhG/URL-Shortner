import express from 'express';
import { urlShortner,urlRedirect } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', urlShortner);
router.get('/decode/:id', urlRedirect);

export default router;
