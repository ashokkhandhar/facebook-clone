import { Router } from "express";
import authenticate from '../middlewares/authentication.js';
import * as friendsController from '../controllers/friendsController.js';

const router = Router();

router.get("/", authenticate, friendsController.fetchFriends);
router.post("/acceptRequest/:friendsId", authenticate, friendsController.acceptFriendRequest);
router.post("/sendrequest", authenticate, friendsController.sendFriendRequest);
router.get("/friendrequests", authenticate, friendsController.fetchAllRequest);
router.post("/unfriend", authenticate, friendsController.unfriend);

export default router;