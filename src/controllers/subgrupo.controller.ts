import { Request, Response, NextFunction } from "express"
import * as subgrupoService from "../services/subgrupo.service"

export async function upsert_subgrupos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const EMPRESAID = req.EMPRESAID!
    const subgrupos = req.body

    if (!Array.isArray(subgrupos)) {
      return res.status(400).json({
        message: "Body deve ser um array de subgrupos"
      })
    }

    await subgrupoService.upsert_subgrupos(EMPRESAID, subgrupos)

    return res.json({ mensagem: "sucesso" })
  } catch (err) {
    next(err)
  }
}
