import { prisma } from "../lib/prisma";

export async function criar_item_venda(
  VENDA_ID: number,
  PRODUTO_ID: number,
  itens: any,
) {
  const { COD_PRODUTO, ...dados } = itens;

  await prisma.venda_item.create({
    data: {
      ...dados,
      COD_PRODUTO: String(COD_PRODUTO).padStart(6, "0"),
      PRODUTO_ID,
      VENDA_ID,
    },
  });
}
