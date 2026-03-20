import { Request, Response, NextFunction } from "express";
import * as ingredienteService from "../services/ingrediente.service";

export async function upsert_ingredientes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const ingredientes = req.body;

    if (!Array.isArray(ingredientes)) {
      return res.status(400).json({
        message: "Body deve ser um array de ingredientes",
      });
    }

    await ingredienteService.upsert_ingredientes(EMPRESAID, ingredientes);

    return res.status(201).json({ mensagem: "sucesso" });
  } catch (err) {
    next(err);
  }
}

export async function listar_ingredientes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;

    const ingredientes =
      await ingredienteService.listar_ingredientes(EMPRESAID);

    return res.status(200).json(ingredientes);
  } catch (err) {
    next(err);
  }
}

export async function listar_ingrediente_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const CODIGO = String(req.params.CODIGO);

    const ingrediente = await ingredienteService.listar_ingrediente_codigo(
      EMPRESAID,
      CODIGO,
    );

    return res.status(200).json(ingrediente);
  } catch (err) {
    next(err);
  }
}
