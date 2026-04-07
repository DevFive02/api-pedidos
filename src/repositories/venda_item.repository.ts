import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

type PrismaTx = Prisma.TransactionClient;

export async function criar_item_venda(
  VENDA_ID: number,
  PRODUTO_ID: number,
  itens: any,
  tx: PrismaTx,
) {
  const { COD_PRODUTO, ...dados } = itens;

  await tx.venda_item.create({
    data: {
      ...dados,
      COD_PRODUTO: String(COD_PRODUTO).padStart(6, "0"),
      PRODUTO_ID,
      VENDA_ID,
    },
  });
}
