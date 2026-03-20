import { Request, Response, NextFunction } from "express";
import * as mesaComandaService from "../services/mesa-comanda.service";

export async function listar_mesa_comanda(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = Number(req.params.EMPRESAID);

    const result = await mesaComandaService.listar_mesa_comanda(EMPRESAID);

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function listar_mesa_comanda_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = Number(req.params.EMPRESAID);
    const CODIGO = String(req.params.CODIGO);

    const result = await mesaComandaService.listar_mesa_comanda_codigo(
      EMPRESAID,
      CODIGO,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function gravar_mesa_comanda(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = Number(req.params.EMPRESAID);
    const mesaComanda = req.body;

    const result = await mesaComandaService.gravar_mesa_comanda(
      EMPRESAID,
      mesaComanda,
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function conferencia_mesa_comanda(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = Number(req.params.EMPRESAID);
    const CODIGO = String(req.params.CODIGO);

    const result = await mesaComandaService.conferencia_mesa_comanda(
      EMPRESAID,
      CODIGO,
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
}
