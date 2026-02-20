import { prisma } from "../lib/prisma";

export async function upsert_subgrupo(EMPRESAID: number, subgrupo: any) {
  const existente = await prisma.subgrupo.findFirst({
    where: {
      CODIGO: subgrupo.CODIGO,
      EMPRESAID,
    },
  });

  if (existente) {
    await prisma.subgrupo.update({
      where: { ID: existente.ID },
      data: {
        ...subgrupo,
      },
    });
  } else {
    await prisma.subgrupo.create({
      data: {
        ...subgrupo,
        EMPRESAID,
      },
    });
  }
}
