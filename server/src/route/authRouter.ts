import {registerUser} from '../controller/authController';
import express from 'express';

export const authRouter = express.Router();

authRouter.post('/register', registerUser);