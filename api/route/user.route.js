import express from 'express';
import { test } from '../controller/user.controller.js';


const router = express.Router();

router.get('/test' , test )
//req is from the client and res is send the response to the server
export default router;