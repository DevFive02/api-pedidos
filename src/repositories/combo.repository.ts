import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { tratarCombo } from "../utils";

type PrismaTx = Prisma.TransactionClient;

export async function listar_combos(EMPRESAID: number) {
  const combo = await prisma.$queryRaw`
    SELECT ID_EXTERNO AS ID,DESCRICAO,QTDE_MAX,ORDEM,CODPRODUTO,OBRIGATORIO,
    coalesce(VALOR_BASE, 0) VALOR_BASE FROM combo
    WHERE EMPRESAID = ${EMPRESAID}
  `;

  return combo;
}

export async function listar_combo_codigo(EMPRESAID: number, CODIGO: number) {
  const combo = await prisma.$queryRaw`
    SELECT ID_EXTERNO AS ID,DESCRICAO,QTDE_MAX,ORDEM,CODPRODUTO,OBRIGATORIO,
    coalesce(VALOR_BASE, 0) VALOR_BASE FROM combo
    WHERE EMPRESAID = ${EMPRESAID} AND ID = ${CODIGO}
  `;

  return combo;
}

export async function upsert_produto_combo(
  EMPRESAID: number,
  PRODUTOID: number,
  data: any,
  tx?: PrismaTx,
) {
  const comboFinal = tratarCombo(data);

  const existente = await (tx || prisma).combo.findFirst({
    where: {
      EMPRESAID,
      PRODUTOID,
      ID_EXTERNO: comboFinal.ID_EXTERNO,
    },
  });

  if (existente) {
    const combo = await (tx || prisma).combo.update({
      data: {
        PRODUTOID,
        ...comboFinal,
      },
      where: {
        ID: existente.ID,
      },
    });

    return combo;
  } else {
    const combo = await (tx || prisma).combo.create({
      data: {
        EMPRESAID,
        PRODUTOID,
        ...comboFinal,
      },
    });

    return combo;
  }
}
