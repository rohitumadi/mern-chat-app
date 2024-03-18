import express from "express";
import {
  getChats,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/:id", protectRoute, sendMessage);
router.get("/", protectRoute, getChats);
router.get("/:id", protectRoute, getMessages);

export default router;
