import * as comboRepository from "../repositories/combo.repository";

export async function listar_combos(EMPRESAID: number) {
  return comboRepository.listar_combos(EMPRESAID);
}

export async function listar_combo_codigo(EMPRESAID: number, CODIGO: number) {
  return comboRepository.listar_combo_codigo(EMPRESAID, CODIGO);
}
