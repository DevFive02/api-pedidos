import { Request, Response, NextFunction } from "express";
import * as funcionarioService from "../services/funcionario.service";

export async function listar_funcionarios(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;

    const data = await funcionarioService.listar_funcionarios(EMPRESAID);

    return res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function listar_funcionario_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const CODIGO = String(req.params.CODIGO);

    const data = funcionarioService.listar_funcionario_codigo(
      EMPRESAID,
      CODIGO,
    );

    return res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function upsert_funcionarios(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const funcionarios = req.body;

    if (!Array.isArray(funcionarios)) {
      return res.status(400).json({
        message: "Body deve ser um array de funcionarios",
      });
    }

    const data = await funcionarioService.upsert_funcionarios(EMPRESAID, funcionarios);

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}
