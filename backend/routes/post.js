import { Router } from 'express';
import authenticate from '../middlewares/authentication.js';
import * as postController from '../controllers/postController.js';

const router = Router();

router.post("/like/:postId", authenticate, postController.likePost);
router.post("/dislike/:postId", authenticate, postController.dislikePost);

export default router;