import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  listar_funcionarios,
  listar_funcionario_codigo,
  upsert_funcionarios,
} from "../controllers/funcionario.controller";

const router = Router();

router.get("/", authMiddleware, listar_funcionarios);
router.get("/:CODIGO", authMiddleware, listar_funcionario_codigo);
router.post("/", authMiddleware, upsert_funcionarios)

export default router;
