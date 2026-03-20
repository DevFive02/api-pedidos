import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  listar_combo_produtos,
  listar_combo_produto_codigo,
} from "../controllers/combo-produto.controller";

const router = Router();

router.get("/", authMiddleware, listar_combo_produtos);
router.get("/:CODIGO", authMiddleware, listar_combo_produto_codigo);

export default router;
