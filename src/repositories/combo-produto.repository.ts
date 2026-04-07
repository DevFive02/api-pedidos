import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { tratarItemCombo } from "../utils";

type PrismaTx = Prisma.TransactionClient;

export async function listar_combo_produtos(EMPRESAID: number) {
  const comboProdutos =
    await prisma.$queryRaw`SELECT ID_EXTERNO AS ID,COMBO_ID_EXTERNO as COMBO_ID,CODPRODUTO,
    coalesce(VALOR, 0) VALOR,coalesce(QTDE, 0) QTDE 
    FROM combo_produtos WHERE EMPRESAID = ${EMPRESAID}`;

  return comboProdutos;
}

export async function listar_combo_produto_codigo(
  EMPRESAID: number,
  CODIGO: number,
) {
  const comboProdutos =
    await prisma.$queryRaw`SELECT ID_EXTERNO AS ID,COMBO_ID_EXTERNO as COMBO_ID,CODPRODUTO,
    coalesce(VALOR, 0) VALOR,coalesce(QTDE, 0) QTDE 
    FROM combo_produtos WHERE EMPRESAID = ${EMPRESAID} AND ID = ${CODIGO}`;

  return comboProdutos;
}

export async function upsert_produto_combo_produtos(
  EMPRESAID: number,
  COMBO_ID: number,
  data: any,
  tx?: PrismaTx,
) {
  const itemComboFinal = tratarItemCombo(data);

  const existente = await (tx || prisma).combo_produtos.findFirst({
    where: {
      COMBO_ID,
      COMBO_ID_EXTERNO: itemComboFinal.COMBO_ID_EXTERNO,
      ID_EXTERNO: itemComboFinal.ID_EXTERNO,
      CODPRODUTO: itemComboFinal.CODPRODUTO,
      EMPRESAID,
    },
  });

  if (existente) {
    await (tx || prisma).combo_produtos.update({
      data: {
        ...itemComboFinal,
      },
      where: {
        ID: existente.ID,
      },
    });
  } else {
    await (tx || prisma).combo_produtos.create({
      data: {
        EMPRESAID,
        COMBO_ID,
        ...itemComboFinal,
      },
    });
  }
}
