import { prisma } from "../lib/prisma";
import { tratarCombo } from "../utils";

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
) {
  const comboFinal = tratarCombo(data);

  const existente = await prisma.combo.findFirst({
    where: {
      EMPRESAID,
      PRODUTOID,
      ID_EXTERNO: comboFinal.ID_EXTERNO,
    },
  });

  if (existente) {
    const combo = await prisma.combo.update({
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
    const combo = await prisma.combo.create({
      data: {
        EMPRESAID,
        PRODUTOID,
        ...comboFinal,
      },
    });

    return combo;
  }
}
