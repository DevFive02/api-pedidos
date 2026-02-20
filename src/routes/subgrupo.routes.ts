import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middleware"
import { upsert_subgrupos } from "../controllers/subgrupo.controller"

const router = Router()

router.post("/", authMiddleware, upsert_subgrupos)

export default router
