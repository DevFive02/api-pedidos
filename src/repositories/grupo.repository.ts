import { prisma } from "../lib/prisma";

export async function listar_grupos(EMPRESAID: number) {
  const grupos = await prisma.grupo.findMany({
    where: {
      EMPRESAID,
    },
  });

  const gruposComFoto = await Promise.all(
    grupos.map(async (grupo) => {
      if (!grupo.FOTO) return grupo;

      try {
        const urlFoto = `${process.env.SERVER_URL}/${grupo.FOTO}`;
        const response = await fetch(urlFoto);

        if (!response.ok) return grupo;

        const contentType = response.headers.get("content-type");

        if (!contentType?.startsWith("image")) return grupo;

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");

        return {
          ...grupo,
          FOTO: `data:${contentType};base64,${base64}`,
        };
      } catch (error) {
        console.error("Erro ao converter imagem:", grupo.FOTO);
        return grupo;
      }
    }),
  );

  return gruposComFoto;
}

export async function listar_grupo_codigo(EMPRESAID: number, CODIGO: string) {
  const grupo = await prisma.grupo.findFirst({
    where: {
      EMPRESAID,
      CODIGO,
    },
  });

  return grupo;
}

export async function upsert_grupo(EMPRESAID: number, grupo: any) {
  const existente = await prisma.grupo.findFirst({
    where: {
      CODIGO: grupo.CODIGO,
      EMPRESAID,
    },
  });

  if (existente) {
    return await prisma.grupo.update({
      where: {
        ID: existente.ID,
      },
      data: {
        ...grupo,
        EMPRESAID,
      },
    });
  } else {
    return await prisma.grupo.create({
      data: {
        ...grupo,
        EMPRESAID,
      },
    });
  }
}

export async function listar_grupo_id(EMPRESAID: number, ID: number) {
  const grupo = await prisma.grupo.findFirst({
    where: {
      EMPRESAID,
      ID,
    },
  });

  if (!grupo) return null;

  if (grupo.FOTO) {
    const urlFoto = `${process.env.SERVER_URL}/${grupo.FOTO}`;

    const response = await fetch(urlFoto);

    if (
      response.ok &&
      response.headers.get("content-type")?.startsWith("image")
    ) {
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const contentType = response.headers.get("content-type");

      grupo.FOTO = `data:${contentType};base64,${base64}`;
    } else {
      console.error("Imagem não encontrada:", urlFoto);
      grupo.FOTO = null;
    }
  }

  return grupo;
}
