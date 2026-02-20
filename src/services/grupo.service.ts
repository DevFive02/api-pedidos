import * as grupoRepository from "../repositories/grupo.repository";

export async function upsert_grupos(EMPRESAID: number, grupos: any[]) {
  for (const grupo of grupos) {
    await grupoRepository.upsert_grupo(EMPRESAID, grupo);
  }
}
