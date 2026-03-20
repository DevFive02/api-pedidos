import { NextFunction, Request, Response } from "express";
import * as produtoAdicionalService from "../services/produto-adicional.service";

export async function listar_produto_adicionais(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;

    const produtosAdicionais =
      await produtoAdicionalService.listar_produto_adicionais(empresa_id);

    return res.status(200).json(produtosAdicionais);
  } catch (err) {
    next(err);
  }
}

export async function listar_produto_adicional_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;
    const codigo = String(req.params.CODIGO);

    const produtosAdicional =
      await produtoAdicionalService.listar_produto_adicional_codigo(
        empresa_id,
        codigo,
      );

    return res.status(200).json(produtosAdicional);
  } catch (err) {
    next(err);
  }
}
