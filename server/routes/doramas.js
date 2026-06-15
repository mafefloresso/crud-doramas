import express from "express";
import * as doramasController from "../controllers/doramas.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, doramasController.getDoramas);

router.get("/:id", verifyToken, doramasController.getDorama);

router.post("/", verifyToken, doramasController.createDorama);

router.put("/:id", verifyToken, doramasController.updateDorama);

router.delete("/:id", verifyToken, doramasController.deleteDorama);

export default router;