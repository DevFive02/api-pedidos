import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  criar_pedido,
  listar_pedidos,
  buscar_pedido_por_id,
} from "../controllers/pedido.controller";

const router = Router();

router.post("/", authMiddleware, criar_pedido);
router.get("/", authMiddleware, listar_pedidos);
router.get("/:id", authMiddleware, buscar_pedido_por_id);

export default router;
