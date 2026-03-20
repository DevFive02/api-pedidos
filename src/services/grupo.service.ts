import * as grupoRepository from "../repositories/grupo.repository";

export async function upsert_grupos(EMPRESAID: number, grupo: any) {
  return await grupoRepository.upsert_grupo(EMPRESAID, grupo);
}

export async function listar_grupos(EMPRESAID: number) {
  return await grupoRepository.listar_grupos(EMPRESAID);
}

export async function listar_grupo_codigo(EMPRESAID: number, CODIGO: string) {
  return await grupoRepository.listar_grupo_codigo(EMPRESAID, CODIGO);
}

export async function listar_grupo_id(EMPRESAID: number, ID: number) {
  return await grupoRepository.listar_grupo_id(EMPRESAID, ID);
}
