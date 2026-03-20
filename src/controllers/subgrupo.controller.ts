import { Request, Response, NextFunction } from "express";
import * as subgrupoService from "../services/subgrupo.service";

export async function upsert_subgrupos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const subgrupo = req.body;

    const data = await subgrupoService.upsert_subgrupos(EMPRESAID, subgrupo);

    if (data) {
      return res.status(201).json(data);
    } else {
      return res.status(400).json(data);
    }
  } catch (err) {
    next(err);
  }
}

export async function listar_subgrupos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;

    const data = await subgrupoService.listar_subgrupos(EMPRESAID);

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

export async function listar_subgrupo_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const CODIGO = String(req.params.CODIGO);

    const data = await subgrupoService.listar_subgrupo_codigo(
      EMPRESAID,
      CODIGO,
    );

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
