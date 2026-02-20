import * as subgrupoRepository from "../repositories/subgrupo.repository"

export async function upsert_subgrupos(
  EMPRESAID: number,
  subgrupos: any[]
) {
  for (const subgrupo of subgrupos) {
    await subgrupoRepository.upsert_subgrupo(EMPRESAID, subgrupo)
  }
}
