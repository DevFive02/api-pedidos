import { Router } from "express";
import {
  listar_produto_codigo,
  listar_produto_foto,
  listar_produtos,
  listar_produtos_cardapio,
  upsert_produto,
} from "../controllers/produto.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, listar_produtos);
router.get("/cardapio", authMiddleware, listar_produtos_cardapio);
router.get("/:CODIGO", authMiddleware, listar_produto_codigo);
router.get("/:CODIGO/foto", authMiddleware, listar_produto_foto);
router.post("/", authMiddleware, upsert_produto);

export default router;
