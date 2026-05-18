import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddlware } from '../middlewares/auth.middleware';

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

/**
 * @description Update user
 * @route PATCH /api/auth/update
 * @access Private
 */
authRouter.patch('/update', authMiddlware, authController.updateUser);

