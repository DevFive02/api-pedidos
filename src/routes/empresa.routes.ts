import { Router } from "express";
import {
  criar_empresa,
  listar_empresa,
  listar_empresa_codigo,
  rotacionar_secret,
} from "../controllers/empresa.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, listar_empresa);
router.get("/:codigo", authMiddleware, listar_empresa_codigo);
router.post("/", criar_empresa);
router.post("/rotate-secret", authMiddleware, rotacionar_secret);

export default router;
