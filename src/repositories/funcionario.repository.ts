import { prisma } from "../lib/prisma";

export async function listar_funcionarios(EMPRESAID: number) {
  const funcionarios = await prisma.funcionario.findMany({
    select: {
      CODIGO: true,
      NOME: true,
      PASS: true,
    },
    where: {
      EMPRESAID,
    },
    orderBy: {
      NOME: "asc",
    },
  });
 

  return funcionarios;
}

export async function listar_funcionario_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  const funcionarios = await prisma.funcionario.findMany({
    select: {
      CODIGO: true,
      NOME: true,
      PASS: true,
    },
    where: {
      EMPRESAID,
      CODIGO,
    },
    orderBy: {
      NOME: "asc",
    },
  });

  return funcionarios;
}

export async function upsert_funcionario(EMPRESAID: number, funcionario: any) {
  const existente = await prisma.funcionario.findFirst({
    where: {
      EMPRESAID,
      CODIGO: funcionario.CODIGO,
    },
  });

  if (existente) {
    return await prisma.funcionario.update({
      data: {
        ...funcionario,
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
    return await prisma.funcionario.create({
      data: {
        EMPRESAID,
        ...funcionario,
      },
      select: {
        ID: true,
        CODIGO: true,
      },
    });
  }
}
