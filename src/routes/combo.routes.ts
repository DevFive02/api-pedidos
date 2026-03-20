import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  listar_combos,
  listar_combo_codigo,
} from "../controllers/combo.controller";

const router = Router();

router.get("/", authMiddleware, listar_combos);
router.get("/:CODIGO", authMiddleware, listar_combo_codigo);

export default router;
