import { prisma } from "../lib/prisma";

export async function listar_mesa_comanda(EMPRESAID: number) {}

export async function listar_mesa_comanda_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {}

export async function gravar_mesa_comanda(
  EMPRESAID: number,
  mesaComanda: any,
) {}

export async function conferencia_mesa_comanda(
  EMPRESAID: number,
  CODIGO: string,
) {}
