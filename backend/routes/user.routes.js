import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersByQuery } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersByQuery);

export default router;
