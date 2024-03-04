import express from 'express';
import { updatedUser,deleteUser } from '../controller/user.controller.js';
import {verifyToken} from '../utils/verifyUser.js'


const router = express.Router();


router.post('/update/:id',verifyToken,updatedUser )

router.delete('/delete/:id',verifyToken,deleteUser )

export default router;