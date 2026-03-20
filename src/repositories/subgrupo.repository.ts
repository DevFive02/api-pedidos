import { prisma } from "../lib/prisma";

export async function upsert_subgrupo(
  EMPRESAID: number,
  subgrupo: any,
  GRUPOID: number,
) {
  const existente = await prisma.subgrupo.findFirst({
    where: {
      CODIGO: subgrupo.CODIGO,
      EMPRESAID,
    },
  });

  if (existente) {
    return await prisma.subgrupo.update({
      where: { ID: existente.ID },
      data: {
        ...subgrupo,
      },
    });
  } else {
    return await prisma.subgrupo.create({
      data: {
        ...subgrupo,
        EMPRESAID,
        GRUPOID,
      },
    });
  }
}

export async function listar_subgrupos(EMPRESAID: number) {
  const subgrupos = await prisma.subgrupo.findMany({
    select: {
      CODIGO: true,
      CODGRUPO: true,
      SUBGRUPO: true,
      QTDE_MAX_KYOSK: true,
      NAO_MOSTRA_KYOSK: true,
      FOTO: true,
    },
    where: {
      EMPRESAID,
    },
    orderBy: {
      CODIGO: "asc",
    },
  });

  const subgruposComFoto = await Promise.all(
    subgrupos.map(async (subgrupo) => {
      if (!subgrupo.FOTO) return subgrupo;

      try {
        const urlFoto = `${process.env.SERVER_URL}/${subgrupo.FOTO}`;
        const response = await fetch(urlFoto);

        if (!response.ok) return subgrupo;

        const contentType = response.headers.get("content-type");

        if (!contentType?.startsWith("image")) return subgrupo;

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");

        return {
          ...subgrupo,
          FOTO: `data:${contentType};base64,${base64}`,
        };
      } catch (error) {
        console.error("Erro ao converter imagem:", subgrupo.FOTO);
        return subgrupo;
      }
    }),
  );

  return subgruposComFoto;
}

export async function listar_subgrupo_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  const subgrupo = await prisma.subgrupo.findFirst({
    select: {
      CODIGO: true,
      CODGRUPO: true,
      SUBGRUPO: true,
      QTDE_MAX_KYOSK: true,
      NAO_MOSTRA_KYOSK: true,
      FOTO: true,
    },
    where: {
      EMPRESAID,
      CODIGO,
    },
    orderBy: {
      CODIGO: "asc",
    },
  });

  if (subgrupo?.FOTO) {
    const urlFoto = `${process.env.SERVER_URL}/${subgrupo.FOTO}`;

    const response = await fetch(urlFoto);

    if (
      response.ok &&
      response.headers.get("content-type")?.startsWith("image")
    ) {
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const contentType = response.headers.get("content-type");

      subgrupo.FOTO = `data:${contentType};base64,${base64}`;
    } else {
      console.error("Imagem não encontrada:", urlFoto);
      subgrupo.FOTO = null;
    }
  }

  return subgrupo;
}

export async function listar_subgrupo_id(EMPRESAID: number, ID: number) {
  const subgrupo = await prisma.subgrupo.findFirst({
    where: {
      EMPRESAID,
      ID,
    },
  });

  if (!subgrupo) return null;

  if (subgrupo.FOTO) {
    const urlFoto = `${process.env.SERVER_URL}/${subgrupo.FOTO}`;

    const response = await fetch(urlFoto);

    if (
      response.ok &&
      response.headers.get("content-type")?.startsWith("image")
    ) {
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const contentType = response.headers.get("content-type");

      subgrupo.FOTO = `data:${contentType};base64,${base64}`;
    } else {
      console.error("Imagem não encontrada:", urlFoto);
      subgrupo.FOTO = null;
    }
  }

  return subgrupo;
}
