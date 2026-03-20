import * as mesaComandaRepository from "../repositories/mesa-comanda.repository";

export async function listar_mesa_comanda(EMPRESAID: number) {
  return await mesaComandaRepository.listar_mesa_comanda(EMPRESAID);
}

export async function listar_mesa_comanda_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return await mesaComandaRepository.listar_mesa_comanda_codigo(
    EMPRESAID,
    CODIGO,
  );
}

export async function gravar_mesa_comanda(EMPRESAID: number, mesaComanda: any) {
  return await mesaComandaRepository.gravar_mesa_comanda(
    EMPRESAID,
    mesaComanda,
  );
}

export async function conferencia_mesa_comanda(
  EMPRESAID: number,
  CODIGO: string,
) {
  return await mesaComandaRepository.conferencia_mesa_comanda(
    EMPRESAID,
    CODIGO,
  );
}
