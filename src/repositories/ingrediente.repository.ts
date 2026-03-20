import { prisma } from "../lib/prisma";

export async function upsert_ingrediente(EMPRESAID: number, ingrediente: any) {
  const existente = await prisma.ingrediente.findFirst({
    where: {
      CODIGO: ingrediente.CODIGO,
      EMPRESAID,
    },
  });

  if (existente) {
    await prisma.ingrediente.update({
      where: { ID: existente.ID },
      data: {
        ...ingrediente,
        EMPRESAID,
      },
    });
  } else {
    await prisma.ingrediente.create({
      data: {
        ...ingrediente,
        EMPRESAID,
      },
    });
  }
}

export async function listar_ingredientes(EMPRESAID: number) {
  return await prisma.ingrediente.findMany({
    where: {
      EMPRESAID,
    },
  });
}

export async function listar_ingrediente_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return await prisma.ingrediente.findMany({
    where: {
      EMPRESAID,
      CODIGO,
    },
  });
}
