import { prisma } from "../lib/prisma";

export async function criar_venda(EMPRESAID: number, venda: any) {
  const { ID, ...dados } = venda;

  return await prisma.venda.create({
    data: { ...dados, EMPRESAID, ID_EXTERNO: ID },
  });
}

export async function listar_vendas(EMPRESAID: number) {
  return await prisma.venda.findMany({
    where: {
      EMPRESAID,
      STATUS: "PENDENTE",
    },
    include: {
      CLIENTE: true,
      ITENS: true,
      PAGAMENTOS: true,
    },
  });
}

export async function aceitar_venda(EMPRESAID: number, vendaId: number) {
  try {
    await prisma.venda.update({
      data: {
        STATUS: "ACEITO",
      },
      where: {
        EMPRESAID,
        ID: vendaId,
      },
    });

    return true;
  } catch {
    return false;
  }
}

export async function listar_venda_id(EMPRESAID: number, ID: number) {
  return await prisma.venda.findFirst({
    where: {
      EMPRESAID,
      ID,
    },
  });
}
