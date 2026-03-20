import { prisma } from "../lib/prisma";
import { formatarCNPJ } from "../utils";

export function criar(data: any) {
  return prisma.empresa.create({ data });
}

export function buscar_por_client_id(CLIENT_ID: string) {
  return prisma.empresa.findFirst({
    where: { CLIENT_ID },
  });
}

export function buscar_por_cnpj(CNPJ: string) {
  return prisma.empresa.findFirst({
    where: { CNPJ },
  });
}

export function atualizar_secret(empresa_id: number, SECRET_HASH: string) {
  return prisma.empresa.update({
    where: { ID: empresa_id },
    data: { SECRET_HASH },
  });
}

export async function listar_empresa(ID: number) {
  const empresa = await prisma.empresa.findUnique({
    select: {
      CODIGO: true,
      CNPJ: true,
      FILIAL: true,
      FANTASIA: true,
      ENDERECO: true,
      BAIRRO: true,
      NUMERO : true,
      CIDADE: true,
      UF: true,
      CEP: true,
    },
    where: {
      ID,
    },
  });

  if (!empresa) return null;

  return {
    ...empresa,
    CNPJ: formatarCNPJ(empresa.CNPJ),
  };
}

export async function listar_empresa_codigo(ID: number, CODIGO: string) {
  const empresa = await prisma.empresa.findUnique({
    select: {
      CODIGO: true,
      CNPJ: true,
      FILIAL: true,
      FANTASIA: true,
      ENDERECO: true,
      NUMERO: true,
      BAIRRO: true,
      CIDADE: true,
      UF: true,
      CEP: true,
    },
    where: {
      ID,
      CODIGO,
    },
  });

  if (!empresa) return null;

  return {
    ...empresa,
    CNPJ: formatarCNPJ(empresa.CNPJ),
  };
}
