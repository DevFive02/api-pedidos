import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  listar_vendedores,
  listar_vendedores_codigo,
  upsert_vendedor,
} from "../controllers/vendedor.controller";

const router = Router();

router.get("/", authMiddleware, listar_vendedores);
router.get("/:codigo", authMiddleware, listar_vendedores_codigo);
router.post("/", authMiddleware, upsert_vendedor);

export default router;
