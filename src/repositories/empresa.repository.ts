import { prisma } from "../lib/prisma";

export function criar(data: {
  cnpj: string;
  razao: string;
  client_id: string;
  secret_hash: string;
}) {
  return prisma.empresa.create({ data });
}

export function buscar_por_client_id(client_id: string) {
  return prisma.empresa.findFirst({
    where: { client_id },
  });
}

export function buscar_por_cnpj(cnpj: string) {
  return prisma.empresa.findFirst({
    where: { cnpj },
  });
}

export function atualizar_secret(empresa_id: number, secret_hash: string) {
  return prisma.empresa.update({
    where: { id: empresa_id },
    data: { secret_hash },
  });
}
