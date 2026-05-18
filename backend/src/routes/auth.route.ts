import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddlware } from '../middlewares/auth.middleware';

export const authRouter = Router();

/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access public
 */
authRouter.post('/register', authController.register);

/***
 * @description Login a user
 * @route POST /api/auth/login
 * @access public
 */
authRouter.post('/login', authController.login);

/**
 * @description Add address
 * @route POST /api/auth/add-address
 * @access private
 */
authRouter.post('/add-address', authMiddlware, authController.addAddress);

/**
 * @description Update address
 * @route PATCH /api/auth/update-address/:id
 * @access private
 */
authRouter.patch('/update-address/:id', authMiddlware, authController.updateAddress);

/**
 * @description Delete address
 * @route DELETE /api/auth/delete-address/:id
 * @access private
 */
authRouter.delete('/delete-address/:id', authMiddlware, authController.deleteAddress);
