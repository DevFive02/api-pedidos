import { prisma } from "../lib/prisma";
import {
  parsePreco,
  tratarCombo,
  tratarItemCombo,
  tratarProduto,
} from "../utils";

export function listar_por_empresa(EMPRESAID: number) {
  return prisma.produto.findMany({
    where: {
      EMPRESAID,
    },
    orderBy: {
      PRODUTO: "asc",
    },
  });
}

export async function upsert_produto(EMPRESAID: number, produto: any) {
  const produtoFinal = tratarProduto(produto);

  const existente = await prisma.produto.findFirst({
    where: {
      EMPRESAID,
      CODIGO: produto.CODIGO,
    },
  });

  let dados = null;

  if (existente) {
    dados = await prisma.produto.update({
      data: produtoFinal,
      where: {
        ID: existente.ID,
      },
    });
  } else {
    dados = await prisma.produto.create({
      data: {
        ...produtoFinal,
        EMPRESAID,
      },
    });
  }

  return dados;
}

export async function upsert_produto_adicional(
  EMPRESAID: number,
  PRODUTOID: number,
  data: any,
) {
  const existente = await prisma.produto_adicional.findFirst({
    where: {
      EMPRESAID,
      CODPRODUTO: data.CODPRODUTO,
    },
  });

  if (existente) {
    await prisma.produto_adicional.update({
      data: {
        ...data,
      },
      where: {
        ID: existente.ID,
      },
    });
  } else {
    await prisma.produto_adicional.create({
      data: {
        EMPRESAID,
        PRODUTOID,
        ...data,
      },
    });
  }
}

export async function upsert_produto_ingrediente(
  EMPRESAID: number,
  PRODUTOID: number,
  data: any,
) {
  const existente = await prisma.produto_ingrediente.findFirst({
    where: {
      EMPRESAID,
      CODPRODUTO: data.CODPRODUTO,
    },
  });

  if (existente) {
    await prisma.produto_ingrediente.update({
      data: {
        ...data,
      },
      where: {
        ID: existente.ID,
      },
    });
  } else {
    const ingrediente = await prisma.ingrediente.findFirst({
      where: {
        EMPRESAID,
        CODIGO: data.CODINGREDIENTE,
      },
    });

    await prisma.produto_ingrediente.create({
      data: {
        EMPRESAID,
        PRODUTOID,
        INGREDIENTEID: ingrediente?.ID,
        ...data,
      },
    });
  }
}

export async function upsert_produto_opcional(
  EMPRESAID: number,
  PRODUTOID: number,
  data: any,
) {
  const existente = await prisma.produto_opcional.findFirst({
    where: {
      EMPRESAID,
      CODPRODUTO: data.CODPRODUTO,
    },
  });

  if (existente) {
    await prisma.produto_opcional.update({
      data: {
        ...data,
      },
      where: {
        ID: existente.ID,
      },
    });
  } else {
    await prisma.produto_opcional.create({
      data: {
        EMPRESAID,
        PRODUTOID,
        ...data,
      },
    });
  }
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

export async function upsert_produto_combo_produtos(
  COMBO_ID: number,
  data: any,
) {
  const itemComboFinal = tratarItemCombo(data);

  const existente = await prisma.combo_produtos.findFirst({
    where: {
      COMBO_ID,
      ID_EXTERNO: itemComboFinal.ID_EXTERNO,
      CODPRODUTO: itemComboFinal.CODPRODUTO,
    },
  });

  if (existente) {
    await prisma.combo_produtos.update({
      data: {
        ...itemComboFinal,
      },
      where: {
        ID: existente.ID,
      },
    });
  } else {
    await prisma.combo_produtos.create({
      data: {
        COMBO_ID,
        ...itemComboFinal,
      },
    });
  }
}
