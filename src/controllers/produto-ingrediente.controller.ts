import { NextFunction, Request, Response } from "express";
import * as produtoIngredienteService from "../services/produto-ingrediente.service";

export async function listar_produto_ingredientes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;

    const produtosAdicionais =
      await produtoIngredienteService.listar_produto_ingredientes(empresa_id);

    return res.status(200).json(produtosAdicionais);
  } catch (err) {
    next(err);
  }
}

export async function listar_produto_ingrediente_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;
    const codigo = req.params.CODIGO;

    const produtosAdicionais =
      await produtoIngredienteService.listar_produto_ingredientes(empresa_id);

    return res.status(200).json(produtosAdicionais);
  } catch (err) {
    next(err);
  }
}
