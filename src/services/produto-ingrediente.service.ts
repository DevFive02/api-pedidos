import * as produtoIngredienteRepository from "../repositories/produto-ingrediente.repository";

export async function listar_produto_ingredientes(EMPRESAID: number) {
  return produtoIngredienteRepository.listar_produto_ingredientes(EMPRESAID);
}

export async function listar_produto_ingrediente_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return produtoIngredienteRepository.listar_produto_ingrediente_codigo(
    EMPRESAID,
    CODIGO,
  );
}
