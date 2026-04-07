import { Request, Response, NextFunction } from "express";
import * as pedidoService from "../services/pedido.service";
import { pedidosSchema } from "../schema/pedido.schema";

export async function criar_pedido(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const parseResult = pedidosSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Payload inválido",
        errors: parseResult.error.flatten(),
      });
    }

    const dados = parseResult.data;
    let pedidosRetorno = [];
    for (const pedido of dados) {
      if (!pedido?.ITENS) {
        pedidosRetorno.push({ message: "Payload inválido" });
      }

      if (!Array.isArray(pedido?.ITENS)) {
        pedidosRetorno.push({
          message: "A requisição de itens deve ser um array",
        });
      }

      const pedidoInserido = await pedidoService.criar_pedido(
        EMPRESAID,
        pedido,
      );

      if (!pedidoInserido) {
        pedidosRetorno.push({
          mensagem: `Erro ao sincronizar pedido ${pedido.ID}`,
          IDSINCRONIZADO: null,
        });
      } else {
        pedidosRetorno.push({
          ...pedido,
          IDSINCRONIZADO: pedidoInserido.ID,
        });
      }
    }

    return res
      .status(201)
      .json({ mensagem: "Processo finalizado", payload: pedidosRetorno });
  } catch (err) {
    next(err);
  }
}

export async function listar_pedidos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const origem =
      typeof req.query.origem === "string" ? req.query.origem : "FIVE";

    const pedidos = await pedidoService.listar_pedidos(EMPRESAID, origem);

    return res.json(pedidos);
  } catch (err) {
    next(err);
  }
}

export async function buscar_pedido_por_id(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const EMPRESAID = req.EMPRESAID!;
    const id = Number(req.params.id);

    const pedido = await pedidoService.buscar_pedido_por_id(EMPRESAID, id);

    if (!pedido) {
      return res.status(404).json({
        message: "Pedido não encontrado",
      });
    }

    return res.json(pedido);
  } catch (err) {
    next(err);
  }
}
