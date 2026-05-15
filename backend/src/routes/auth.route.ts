import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

export const authRouter = Router();

/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
authRouter.post('/register', authController.register);

/***
 * @description Login a user
 * @route POST /api/auth/login
 * @access Public
 */
authRouter.post('/login', authController.login);