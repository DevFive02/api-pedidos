import * as produtoAdicionalRepository from "../repositories/produto-adicional.repository";

export async function listar_produto_adicionais(EMPRESAID: number) {
  return await produtoAdicionalRepository.listar_produto_adicionais(EMPRESAID);
}

export async function listar_produto_adicional_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return await produtoAdicionalRepository.listar_produto_adicional_codigo(
    EMPRESAID,
    CODIGO,
  );
}
