import * as produtoRepository from "../repositories/produto.repository";
import * as produtoAdicionalRepository from "../repositories/produto-adicional.repository";
import * as produtoOpcionalRepository from "../repositories/produto-opcional.repository";
import * as produtoIngredienteRepository from "../repositories/produto-ingrediente.repository";
import * as comboRepository from "../repositories/combo.repository";
import * as comboProdutoRepository from "../repositories/combo-produto.repository";

export async function listar_produtos(empresa_id: number) {
  return await produtoRepository.listar_produtos(empresa_id);
}

export async function listar_produto_codigo(
  empresa_id: number,
  CODIGO: string,
) {
  return await produtoRepository.listar_produto_codigo(empresa_id, CODIGO);
}

export async function listar_produto_foto(empresa_id: number, CODIGO: string) {
  return await produtoRepository.listar_produto_foto(empresa_id, CODIGO);
}

export async function listar_produto_id(empresa_id: number, ID: number) {
  return await produtoRepository.listar_produto_id(empresa_id, ID);
}

export async function listar_produtos_cardapio(empresa_id: number) {
  return await produtoRepository.listar_produtos_cardapio(empresa_id);
}

export async function upsert_produto(empresa_id: number, produto: any) {
  const {
    ADICIONAIS,
    INGREDIENTES,
    OPCIONAIS,
    COMBOS,
    COMBO_PRODUTOS,
    ...dadosProduto
  } = produto;

  const produtoUpsert = await produtoRepository.upsert_produto(
    empresa_id,
    dadosProduto,
  );

  if (produtoUpsert) {
    //insere os adicionais do produto
    if (Array.isArray(ADICIONAIS)) {
      for (const adicional of ADICIONAIS) {
        await produtoAdicionalRepository.upsert_produto_adicional(
          empresa_id,
          produtoUpsert.ID,
          adicional,
        );
      }
    }

    //insere os ingredientes(opcoes) do produto
    if (Array.isArray(INGREDIENTES)) {
      for (const ingrediente of INGREDIENTES) {
        await produtoIngredienteRepository.upsert_produto_ingrediente(
          empresa_id,
          produtoUpsert.ID,
          ingrediente,
        );
      }
    }

    //insere os opcionais do produto
    if (Array.isArray(OPCIONAIS)) {
      for (const opcional of OPCIONAIS) {
        await produtoOpcionalRepository.upsert_produto_opcional(
          empresa_id,
          produtoUpsert.ID,
          opcional,
        );
      }
    }

    if (Array.isArray(COMBOS)) {
      for (const combo of COMBOS) {
        const comboUpsert = await comboRepository.upsert_produto_combo(
          empresa_id,
          produtoUpsert.ID,
          combo,
        );

        if (comboUpsert) {
          //filtra os itens do combo atual
          const comboItens = COMBO_PRODUTOS.filter(
            (item: any) => parseInt(item.COMBO_ID) === combo.ID,
          );

          for (const comboItem of comboItens) {
            await comboProdutoRepository.upsert_produto_combo_produtos(
              empresa_id,
              comboUpsert.ID,
              comboItem,
            );
          }
        }
      }
    }
  }
}
