import * as produtoOpcionalRepository from "../repositories/produto-opcional.repository";

export async function listar_produto_opcionais(EMPRESAID: number) {
  return await produtoOpcionalRepository.listar_produto_opcionais(EMPRESAID);
}

export async function listar_produto_opcional_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return await produtoOpcionalRepository.listar_produto_opcional_codigo(
    EMPRESAID,
    CODIGO,
  );
}
