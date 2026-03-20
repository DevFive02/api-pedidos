import { NextFunction, Request, Response } from "express";
import * as vendaService from "../services/venda.service";
import { vendaSchema } from "../schema/venda.schema";

export async function criar_venda(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const parseResult = vendaSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Payload inválido",
        errors: parseResult.error.flatten(),
      });
    }

    const dados = parseResult.data;

    const venda = await vendaService.criar_venda(EMPRESAID, dados);

    if (venda) {
      return res.status(201).json(venda);
    } else {
      return res.status(401).json({ mensagem: "Erro ao criar venda!" });
    }
  } catch (error) {
    next(error);
  }
}

export async function aceitar_venda(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const vendaId = req.body.ID;

    const sucesso = await vendaService.aceitar_venda(EMPRESAID, vendaId);

    if (!sucesso) {
      return res.status(404).json({ message: "Venda não encontrada" });
    }

    return res.status(200).json({ message: "Venda aceita com sucesso" });
  } catch (error) {
    next(error);
  }
}

export async function listar_vendas(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;

    const vendas = await vendaService.listar_vendas(EMPRESAID);

    return res.status(200).json(vendas);
  } catch (error) {
    next(error);
  }
}

export async function listar_venda_id(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const ID = Number(req.params.ID);

    const venda = await vendaService.listar_venda_id(EMPRESAID, ID);

    if (!venda) {
      return res.status(404).json({ message: "Venda não encontrada" });
    }

    return res.status(200).json(venda);
  } catch (error) {
    next(error);
  }
}
