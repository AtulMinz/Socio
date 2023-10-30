import express from "express";
import { getUser, getUserFriends } from "../controllers/user.js";

import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyUser, getUser);
router.get("/:id/friends", verifyUser, getUserFriends);

export default router;
