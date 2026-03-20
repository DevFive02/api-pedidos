import { prisma } from "../lib/prisma";

export async function criar_venda_pagamento(VENDA_ID: number, dados: any) {
  await prisma.venda_pagamento.create({
    data: {
      VENDA_ID,
      ...dados,
    },
  });
}
