import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

type PrismaTx = Prisma.TransactionClient;

export async function listar_produto_opcionais(EMPRESAID: number) {
  try {
    const data = await prisma.produto_opcional.findMany({
      select: {
        CODIGO: true,
        CODPRODUTO: true,
        CODOPCIONAL: true,
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

export async function listar_produto_opcional_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  try {
    const data = await prisma.produto_opcional.findMany({
      select: {
        CODIGO: true,
        CODPRODUTO: true,
        CODOPCIONAL: true,
      },
      where: {
        EMPRESAID,
        CODIGO,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao listar produto ingrediente por código:", error);
    throw error;
  }
}

export async function upsert_produto_opcional(
  EMPRESAID: number,
  PRODUTOID: number,
  data: any,
  tx?: PrismaTx,
) {
  const existente = await (tx || prisma).produto_opcional.findFirst({
    where: {
      EMPRESAID,
      CODPRODUTO: data.CODPRODUTO,
    },
  });

  if (existente) {
    await (tx || prisma).produto_opcional.update({
      data: {
        ...data,
      },
      where: {
        ID: existente.ID,
      },
    });
  } else {
    await (tx || prisma).produto_opcional.create({
      data: {
        EMPRESAID,
        PRODUTOID,
        ...data,
      },
    });
  }
}
