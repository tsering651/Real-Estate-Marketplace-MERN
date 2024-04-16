import express from 'express';
import { reqSending } from '../controller/info.controller.js'; // Corrected import path

const router = express.Router();

router.post('/send-info', reqSending);

export default router;
