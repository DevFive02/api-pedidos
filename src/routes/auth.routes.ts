import { Router } from "express";
import { gerar_token_empresa } from "../controllers/auth.controller";

const router = Router();

router.post("/token", gerar_token_empresa);

export default router;
