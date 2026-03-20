import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  listar_grupo_codigo,
  listar_grupo_id,
  listar_grupos,
  upsert_grupos,
} from "../controllers/grupo.controller";

const router = Router();

router.get("/", authMiddleware, listar_grupos);
router.get("/:CODIGO", authMiddleware, listar_grupo_codigo);
router.get("/id/:ID", authMiddleware, listar_grupo_id);
router.post("/", authMiddleware, upsert_grupos);

export default router;
