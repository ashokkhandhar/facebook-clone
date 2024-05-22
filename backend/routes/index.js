import { Router } from 'express';
import userRoutes from './user.js';
import authRoutes from './auth.js';
import friendsRoutes from './friends.js';
import postRoutes from './post.js';

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/friends", friendsRoutes);
router.use("/post", postRoutes);

export default router;