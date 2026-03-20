import { Request, Response, NextFunction } from "express";
import * as vendedorService from "../services/vendedor.service";

export async function listar_vendedores(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const vendedores = await vendedorService.listar_vendedores(EMPRESAID);
    res.json(vendedores);
  } catch (error) {
    next(error);
  }
}

export async function listar_vendedores_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const CODIGO = String(req.params.CODIGO);
    const vendedor = await vendedorService.listar_vendedores_codigo(
      EMPRESAID,
      CODIGO,
    );
    res.json(vendedor);
  } catch (error) {
    next(error);
  }
}

export async function upsert_vendedor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const vendedores = req.body;

    if (!Array.isArray(vendedores)) {
      return res.status(400).json({
        message: "Body deve ser um array de funcionarios",
      });
    }

    const result = await vendedorService.upsert_vendedores(
      EMPRESAID,
      vendedores,
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
