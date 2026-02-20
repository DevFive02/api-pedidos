import * as produtoRepository from "../repositories/produto.repository";
import { stringToArray } from "../utils";

export function listar_produtos(empresa_id: number) {
  return produtoRepository.listar_por_empresa(empresa_id);
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
        await produtoRepository.upsert_produto_adicional(
          empresa_id,
          produtoUpsert.ID,
          adicional,
        );
      }
    }

    //insere os ingredientes(opcoes) do produto
    if (Array.isArray(INGREDIENTES)) {
      for (const ingrediente of INGREDIENTES) {
        await produtoRepository.upsert_produto_ingrediente(
          empresa_id,
          produtoUpsert.ID,
          ingrediente,
        );
      }
    }

    //insere os opcionais do produto
    if (Array.isArray(OPCIONAIS)) {
      for (const opcional of OPCIONAIS) {
        await produtoRepository.upsert_produto_opcional(
          empresa_id,
          produtoUpsert.ID,
          opcional,
        );
      }
    }

    if (Array.isArray(COMBOS)) {
      for (const combo of COMBOS) {
        const comboUpsert = await produtoRepository.upsert_produto_combo(
          empresa_id,
          produtoUpsert.ID,
          combo,
        );

        if (comboUpsert) {
          //filtra os itens do combo atual
          const comboItens = COMBO_PRODUTOS.filter(
            (item: any) => parseInt(item.COMBO_ID) === comboUpsert.ID,
          );

          for (const comboItem of comboItens) {
            await produtoRepository.upsert_produto_combo_produtos(
              comboUpsert.ID,
              comboItem,
            );
          }
        }
      }
    }
  }
}
