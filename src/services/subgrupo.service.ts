import * as subgrupoRepository from "../repositories/subgrupo.repository";
import * as grupoRepository from "../repositories/grupo.repository";

export async function upsert_subgrupos(EMPRESAID: number, subgrupo: any) {
  const grupo = await grupoRepository.listar_grupo_codigo(
    EMPRESAID,
    subgrupo.CODGRUPO,
  );

  if (!grupo) {
    return null;
  }

  return await subgrupoRepository.upsert_subgrupo(
    EMPRESAID,
    subgrupo,
    grupo.ID,
  );
}

export async function listar_subgrupos(EMPRESAID: number) {
  return await subgrupoRepository.listar_subgrupos(EMPRESAID);
}

export async function listar_subgrupo_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return await subgrupoRepository.listar_subgrupo_codigo(EMPRESAID, CODIGO);
}
