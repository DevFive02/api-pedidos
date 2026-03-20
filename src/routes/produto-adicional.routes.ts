import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  listar_produto_adicionais,
  listar_produto_adicional_codigo,
} from "../controllers/produto-adicional.controller";

const router = Router();

router.get("/", authMiddleware, listar_produto_adicionais);
router.get("/:CODIGO", authMiddleware, listar_produto_adicional_codigo);

export default router;
