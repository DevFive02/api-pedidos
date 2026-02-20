import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middleware"
import { upsert_ingredientes, listar_ingredientes } from "../controllers/ingrediente.controller"

const router = Router()

router.post("/", authMiddleware, upsert_ingredientes)
router.get("/", authMiddleware, listar_ingredientes)

export default router
