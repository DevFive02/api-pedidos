import { NextFunction, Request, Response } from "express";
import * as produtoOpcionalService from "../services/produto-opcional.service";

export async function listar_produto_opcionais(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;

    const produtosAdicionais =
      await produtoOpcionalService.listar_produto_opcionais(empresa_id);

    return res.status(200).json(produtosAdicionais);
  } catch (err) {
    next(err);
  }
}

export async function listar_produto_opcional_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;
    const codigo = String(req.params.CODIGO);

    const produtoOpcional =
      await produtoOpcionalService.listar_produto_opcional_codigo(
        empresa_id,
        codigo,
      );

    return res.status(200).json(produtoOpcional);
  } catch (err) {
    next(err);
  }
}
