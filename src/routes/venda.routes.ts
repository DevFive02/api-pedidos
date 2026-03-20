import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  aceitar_venda,
  criar_venda,
  listar_vendas,
} from "../controllers/venda.controller";

const router = Router();

router.get("/", authMiddleware, listar_vendas);
router.post("/", authMiddleware, criar_venda);
router.patch("/", authMiddleware, aceitar_venda);

export default router;
