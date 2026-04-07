import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

type PrismaTx = Prisma.TransactionClient;

export async function listar_produto_adicionais(EMPRESAID: number) {
  try {
    const data = await prisma.produto_adicional.findMany({
      select: {
        CODIGO: true,
        CODPRODUTO: true,
        PROD_ADICIONAL: true,
      },
      where: {
        EMPRESAID: EMPRESAID,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao listar produtos adicionais:", error);
    throw error;
  }
}

export async function listar_produto_adicional_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  const data = await prisma.produto_adicional.findFirst({
    select: {
      CODIGO: true,
      CODPRODUTO: true,
      PROD_ADICIONAL: true,
    },
    where: {
      EMPRESAID,
      CODIGO,
    },
  });
}

export async function upsert_produto_adicional(
  EMPRESAID: number,
  PRODUTOID: number,
  data: any,
  tx?: PrismaTx,
) {
  const existente = await (tx || prisma).produto_adicional.findFirst({
    where: {
      EMPRESAID,
      CODPRODUTO: data.CODPRODUTO,
    },
  });

  if (existente) {
    await (tx || prisma).produto_adicional.update({
      data: {
        ...data,
      },
      where: {
        ID: existente.ID,
      },
    });
  } else {
    await (tx || prisma).produto_adicional.create({
      data: {
        EMPRESAID,
        PRODUTOID,
        ...data,
      },
    });
  }
}
