import { prisma } from "../lib/prisma";

export async function listar_vendedores(EMPRESAID: number) {
  return prisma.vendedor.findMany({
    select: {
      CODIGO: true,
      NOME: true,
      SENHA: true,
      CODCAIXA: true,
    },
    where: {
      EMPRESAID,
    },
  });
}

export async function listar_vendedores_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return prisma.vendedor.findMany({
    select: {
      CODIGO: true,
      NOME: true,
      SENHA: true,
      CODCAIXA: true,
      SITUACAO: true,
    },
    where: {
      EMPRESAID,
      CODIGO,
    },
  });
}

export async function upsert_vendedor(EMPRESAID: number, vendedor: any) {
  const existente = await prisma.vendedor.findFirst({
    where: {
      EMPRESAID,
      CODIGO: vendedor.CODIGO,
    },
  });

  if (existente) {
    return await prisma.vendedor.update({
      data: {
        ...vendedor,
      },
      where: {
        ID: existente.ID,
      },
      select: {
        ID: true,
        CODIGO: true,
      },
    });
  } else {
    return await prisma.vendedor.create({
      data: {
        EMPRESAID,
        ...vendedor,
      },
      select: {
        ID: true,
        CODIGO: true,
      },
    });
  }
}
