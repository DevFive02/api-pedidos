import { Router } from "express";
import {
  listar_produtos,
  upsert_produto,
} from "../controllers/produto.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, listar_produtos);
router.post("/", authMiddleware, upsert_produto);

export default router;
