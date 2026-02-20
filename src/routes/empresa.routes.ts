import { Router } from "express";
import {
  criar_empresa,
  rotacionar_secret,
} from "../controllers/empresa.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", criar_empresa);
router.post("/rotate-secret", authMiddleware, rotacionar_secret);

export default router;
