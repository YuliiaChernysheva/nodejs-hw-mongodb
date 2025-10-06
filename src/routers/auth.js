import { Router } from 'express';
import {
  userRegisterController,
  userLoginController,
  refreshSessionController,
  logoutUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema, registerSchema } from '../../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(userRegisterController),
);

router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(userLoginController),
);

router.post('/refresh', ctrlWrapper(refreshSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
