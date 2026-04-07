import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

type PrismaTx = Prisma.TransactionClient;

export async function listar_produto_ingredientes(EMPRESAID: number) {
  try {
    const data = await prisma.produto_ingrediente.findMany({
      select: {
        CODIGO: true,
        CODPRODUTO: true,
        CODINGREDIENTE: true,
      },
      where: {
        EMPRESAID: EMPRESAID,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao listar produtos ingredientes:", error);
    throw error;
  }
}

export async function listar_produto_ingrediente_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  try {
    const data = await prisma.produto_ingrediente.findMany({
      select: {
        CODIGO: true,
        CODPRODUTO: true,
        CODINGREDIENTE: true,
      },
      where: {
        EMPRESAID,
        CODIGO,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao listar produtos ingredientes:", error);
    throw error;
  }
}

export async function upsert_produto_ingrediente(
  EMPRESAID: number,
  PRODUTOID: number,
  data: any,
  tx?: PrismaTx,
) {
  const existente = await (tx || prisma).produto_ingrediente.findFirst({
    where: {
      EMPRESAID,
      CODPRODUTO: data.CODPRODUTO,
    },
  });

  if (existente) {
    await (tx || prisma).produto_ingrediente.update({
      data: {
        ...data,
      },
      where: {
        ID: existente.ID,
      },
    });
  } else {
    const ingrediente = await (tx || prisma).ingrediente.findFirst({
      where: {
        EMPRESAID,
        CODIGO: data.CODINGREDIENTE,
      },
    });

    await (tx || prisma).produto_ingrediente.create({
      data: {
        EMPRESAID,
        PRODUTOID,
        INGREDIENTEID: ingrediente?.ID,
        ...data,
      },
    });
  }
}
