import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  listar_produto_opcionais,
  listar_produto_opcional_codigo,
} from "../controllers/produto-opcional.controller";

const router = Router();

router.get("/", authMiddleware, listar_produto_opcionais);
router.get("/:CODIGO", authMiddleware, listar_produto_opcional_codigo);

export default router;
