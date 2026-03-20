import * as ingredienteRepository from "../repositories/ingrediente.repository";

export async function upsert_ingredientes(
  EMPRESAID: number,
  ingredientes: any[],
) {
  for (const ingrediente of ingredientes) {
    await ingredienteRepository.upsert_ingrediente(EMPRESAID, ingrediente);
  }
}

export async function listar_ingredientes(EMPRESAID: number) {
  return ingredienteRepository.listar_ingredientes(EMPRESAID);
}

export async function listar_ingrediente_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return ingredienteRepository.listar_ingrediente_codigo(EMPRESAID, CODIGO);
}
