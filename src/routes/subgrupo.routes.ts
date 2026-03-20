import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  listar_subgrupo_codigo,
  listar_subgrupos,
  upsert_subgrupos,
} from "../controllers/subgrupo.controller";

const router = Router();

router.get("/", authMiddleware, listar_subgrupos);
router.get("/:CODIGO", authMiddleware, listar_subgrupo_codigo);
router.post("/", authMiddleware, upsert_subgrupos);

export default router;
