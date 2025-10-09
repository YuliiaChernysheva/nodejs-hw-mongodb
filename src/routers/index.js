import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.use('/contacts', auth, contactsRouter);
router.use('/auth', authRouter);

export default router;
