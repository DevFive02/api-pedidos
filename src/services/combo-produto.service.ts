import * as comboProdutoRepository from "../repositories/combo-produto.repository";

export async function listar_combo_produtos(EMPRESAID: number) {
  return comboProdutoRepository.listar_combo_produtos(EMPRESAID);
}

export async function listar_combo_produto_codigo(EMPRESAID: number, CODIGO: number) {
  return comboProdutoRepository.listar_combo_produto_codigo(EMPRESAID, CODIGO);
}
