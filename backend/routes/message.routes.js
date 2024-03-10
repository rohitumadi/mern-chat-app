import express from "express";
import {
  getChats,
  getMessage,
  sendMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/", protectRoute, getChats);
router.get("/:id", protectRoute, getMessage);

export default router;
