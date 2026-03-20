import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  conferencia_mesa_comanda,
  gravar_mesa_comanda,
  listar_mesa_comanda,
  listar_mesa_comanda_codigo,
} from "../controllers/mesa-comanda.controller";

const router = Router();

router.get("/", authMiddleware, listar_mesa_comanda);
router.get("/:CODIGO", authMiddleware, listar_mesa_comanda_codigo);
router.post("/", authMiddleware, gravar_mesa_comanda);
router.patch("/", authMiddleware, conferencia_mesa_comanda);

export default router;
