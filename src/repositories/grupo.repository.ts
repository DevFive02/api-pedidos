import { prisma } from "../lib/prisma";

export async function upsert_grupo(EMPRESAID: number, grupo: any) {
  const existente = await prisma.grupo.findFirst({
    where: {
      CODIGO: grupo.CODIGO,
      EMPRESAID,
    },
  });

  if (existente) {
    await prisma.grupo.update({
      where: {
        CODIGO: existente.CODIGO,
      },
      data: {
        ...grupo,
        EMPRESAID,
      },
    });
  } else {
    await prisma.grupo.create({
      data: {
        ...grupo,
        EMPRESAID,
      },
    });
  }
}
