import { Request, Response, NextFunction } from "express"
import * as grupoService from "../services/grupo.service"

export async function upsert_grupos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const EMPRESAID = req.EMPRESAID!
    const grupos = req.body

    if (!Array.isArray(grupos)) {
      return res.status(400).json({
        message: "Body deve ser um array de grupos"
      })
    }

    await grupoService.upsert_grupos(EMPRESAID, grupos)

    return res.json({ mensagem: "sucesso" })
  } catch (err) {
    next(err)
  }
}
