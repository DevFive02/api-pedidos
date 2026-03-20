import { Request, Response, NextFunction } from "express";
import * as grupoService from "../services/grupo.service";

export async function upsert_grupos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const grupo = req.body;

    const data = await grupoService.upsert_grupos(EMPRESAID, grupo);

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

export async function listar_grupos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;

    const grupos = await grupoService.listar_grupos(EMPRESAID);

    return res.status(200).json(grupos);
  } catch (error) {
    next(error);
  }
}

export async function listar_grupo_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const CODIGO = String(req.params.CODIGO);
    
    const grupo = await grupoService.listar_grupo_codigo(EMPRESAID, CODIGO);

    return res.status(200).json(grupo);
  } catch (error) {
    next(error);
  }
}

export async function listar_grupo_id(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const ID = Number(req.params.ID);

    const grupo = await grupoService.listar_grupo_id(EMPRESAID, ID);

    return res.status(200).json(grupo);
  } catch (error) {
    next(error);
  }
}
