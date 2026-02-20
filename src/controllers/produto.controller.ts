import { Request, Response, NextFunction } from "express";
import * as produtoService from "../services/produto.service";

export async function listar_produtos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;

    const produtos = await produtoService.listar_produtos(empresa_id);

    return res.json(produtos);
  } catch (err) {
    next(err);
  }
}

export async function upsert_produto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dados = req.body;
    const empresa_id = req.EMPRESAID!;

    if (!dados || Object.keys(dados).length === 0) {
      return res.status(400).json({
        error: "Nenhum dado enviado!",
      });
    }

    try {
      await produtoService.upsert_produto(empresa_id, dados);
      return res.status(201).json({ mensagem: "sucesso" });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  } catch (error) {
    next(error);
  }
}
