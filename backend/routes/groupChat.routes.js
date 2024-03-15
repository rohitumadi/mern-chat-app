import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addUser,
  createGroupChat,
  removeUser,
  renameGroupChat,
} from "../controllers/groupChat.controllers.js";

const router = express.Router();

router.post("/", protectRoute, createGroupChat);
router.patch("/:groupId", protectRoute, renameGroupChat);
router.patch("/add-user/:groupId", protectRoute, addUser);
router.patch("/remove-user/:groupId", protectRoute, removeUser);

export default router;
