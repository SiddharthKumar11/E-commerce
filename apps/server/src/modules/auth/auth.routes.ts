import { Router } from 'express';
import { register, login, refreshToken, logout, me } from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.get('/me', authenticate, me);
router.post('/logout', authenticate, logout);

export default router;
