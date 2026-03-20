import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  listar_produto_ingrediente_codigo,
  listar_produto_ingredientes,
} from "../controllers/produto-ingrediente.controller";

const router = Router();

router.get("/", authMiddleware, listar_produto_ingredientes);
router.get("/:CODIGO", authMiddleware, listar_produto_ingrediente_codigo);

export default router;
