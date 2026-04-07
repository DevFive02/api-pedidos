import { prisma } from "../lib/prisma";
import { criar_venda_pagamento } from "../repositories/pagamentos.repository";
import { listar_id_produto_codigo } from "../repositories/produto.repository";
import * as vendaRepository from "../repositories/venda.repository";
import * as vendaItemRepository from "../repositories/venda_item.repository";

export async function criar_venda(EMPRESAID: number, venda: any) {
  const { ITENS, PAGAMENTOS, ...dadosVenda } = venda;

  return await prisma.$transaction(async (tx) => {
    const dados = await vendaRepository.criar_venda(EMPRESAID, dadosVenda, tx);

    if (dados) {
      await Promise.all(
        ITENS.map(async (item: any) => {
          const cod_produto = String(item.COD_PRODUTO).padStart(6, "0");
          const produtoId = await listar_id_produto_codigo(
            EMPRESAID,
            cod_produto,
          );

          if (!produtoId) {
            throw new Error(`Produto ${cod_produto} não encontrado`);
          }

          await vendaItemRepository.criar_item_venda(
            dados.ID,
            produtoId,
            item,
            tx,
          );
        }),
      );

      await Promise.all(
        PAGAMENTOS.map(async (pagamento: any) => {
          const { VENDA_ID, ...dadosPagamento } = pagamento;

          await criar_venda_pagamento(dados.ID, {
            VENDA_ID_EXTERNO: VENDA_ID,
            ...dadosPagamento,
          });
        }),
      );

      const dadosVenda = await vendaRepository.listar_venda_id(
        EMPRESAID,
        dados.ID,
      );

      return dadosVenda;
    } else {
      return null;
    }
  });
}

export async function aceitar_venda(EMPRESAID: number, vendaId: number) {
  return await vendaRepository.aceitar_venda(EMPRESAID, vendaId);
}

export async function listar_vendas(EMPRESAID: number) {
  return await vendaRepository.listar_vendas(EMPRESAID);
}

export async function listar_venda_id(EMPRESAID: number, ID: number) {
  return vendaRepository.listar_venda_id(EMPRESAID, ID);
}
