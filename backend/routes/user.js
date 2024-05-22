import { Router } from 'express';
import authenticate from '../middlewares/authentication.js';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get("/all", authenticate, userController.allUsers);
router.post("/addPost", authenticate, userController.addNewPost);
router.get("/getPosts", authenticate, userController.getUsersPosts);
router.post("/deletePost", authenticate, userController.deleteUsersPost);
router.get("/timeline", authenticate, userController.userTimeline);

export default router;