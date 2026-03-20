import { NextFunction, Request, Response } from "express";
import * as comboProdutoService from "../services/combo-produto.service";

export async function listar_combo_produtos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;

    const combo = await comboProdutoService.listar_combo_produtos(EMPRESAID);

    return res.status(200).json(combo);
  } catch (err) {
    next(err);
  }
}

export async function listar_combo_produto_codigo(
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

    const combo = await comboProdutoService.listar_combo_produto_codigo(EMPRESAID, CODIGO);

    return res.status(200).json(combo);
  } catch (err) {
    next(err);
  }
}

