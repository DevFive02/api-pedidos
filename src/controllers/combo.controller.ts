import { NextFunction, Request, Response } from "express";
import * as comboService from "../services/combo.service";

export async function listar_combos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // const EMPRESAID = req.EMPRESAID!;

    const combo = await comboService.listar_combos(1);

    return res.status(200).json(combo);
  } catch (err) {
    next(err);
  }
}

export async function listar_combo_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const CODIGO = Number(req.params.CODIGO);

    if (isNaN(CODIGO)) {
      return res.status(400).json({ error: "Código inválido" });
    }

    const combo = await comboService.listar_combo_codigo(EMPRESAID, CODIGO);

    return res.status(200).json(combo);
  } catch (err) {
    next(err);
  }
}
