import express from "express";
import { getGenres } from "../controllers/genres.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getGenres);

export default router;