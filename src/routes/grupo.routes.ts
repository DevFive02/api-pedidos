import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upsert_grupos } from "../controllers/grupo.controller";

const router = Router();

router.post("/", authMiddleware, upsert_grupos);

export default router;
