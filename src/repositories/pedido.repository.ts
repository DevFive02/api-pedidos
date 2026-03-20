import { PedidoStatus } from "@prisma/client";
import { prisma } from "../lib/prisma";

async function resolveCliente(EMPRESAID: number, CLIENTE: any) {
  let cliente = await prisma.cliente_pedido.findFirst({
    where: {
      IDEXTERNO: String(CLIENTE.ID),
    },
  });

  if (!cliente) {
    cliente = await prisma.cliente_pedido.create({
      data: {
        IDEXTERNO: String(CLIENTE.ID),
        NOME: CLIENTE.NOME,
        TELEFONE: CLIENTE.TELEFONE,
        ENDERECO: CLIENTE.ENDERECO,
        BAIRRO: CLIENTE.BAIRRO,
        NUMERO: CLIENTE.NUMERO,
        COMPLEMENTO: CLIENTE.COMPLEMENTO,
        CIDADE: CLIENTE.CIDADE,
        UF: CLIENTE.UF,
        CEP: CLIENTE.CEP,
      },
    });
  }

  return cliente;
}

export async function aceitar_pedido(EMPRESAID: number, id: number) {
  await prisma.pedido.update({
    where: { ID: id, EMPRESAID },
    data: { STATUS: PedidoStatus.ACEITO },
  });
}

export async function criar_pedido(EMPRESAID: number, payload: any) {
  const clienteCadastro = await resolveCliente(EMPRESAID, payload.CLIENTE);

  return prisma.$transaction(async (tx) => {
    const { ID, PAGAMENTO, ITENS, CLIENTE, ...payloadPedido } = payload;

    const pedidoCriado = await tx.pedido.create({
      data: {
        IDEXTERNO: String(ID),
        ...payloadPedido,
        EMPRESAID,
        CLIENTE_ID: clienteCadastro.ID,
        STATUS: PedidoStatus.GRAVANDO,
      },
    });

    await tx.forma_pagamento_pedido.create({
      data: {
        PEDIDOID: pedidoCriado.ID,
        ...PAGAMENTO,
      },
    });

    for (const item of ITENS) {
      const { ADICIONAIS, OPCIONAIS, OPCOES, MONTADO, COMBO_ITENS, ...dados } =
        item;

      let produto = null;

      if (dados.CODPRODUTO) {
        produto = await tx.produto.findFirst({
          where: {
            EMPRESAID,
            CODIGO: dados.COD_PRODUTO,
          },
        });
      }

      const consumoCriado = await tx.consumo_pedido.create({
        data: {
          ...dados,
          ID_PEDIDO: pedidoCriado.ID,
          ID_PEDIDOEXTERNO: pedidoCriado.IDEXTERNO,
          PRODUTOID: produto?.ID,
        },
      });

      for (const m of MONTADO ?? []) {
        const produtoConsumo = await tx.produto.findFirst({
          where: {
            EMPRESAID,
            CODIGO: m.CODPRODUTO,
          },
        });

        await tx.item_montado_pedido.create({
          data: {
            ...m,
            IDPRODUTO: produtoConsumo?.ID,
            CONSUMOPEDIDO: consumoCriado.ID,
          },
        });
      }

      for (const ad of ADICIONAIS ?? []) {
        const produtoAdicional = await tx.produto.findFirst({
          where: {
            EMPRESAID,
            CODIGO: ad.CODADICIONAL,
          },
        });

        await tx.item_adicional_pedido.create({
          data: {
            ...ad,
            IDADICIONAL: produtoAdicional?.ID,
            CONSUMOPEDIDO: consumoCriado.ID,
            EMPRESAID,
          },
        });
      }

      for (const opc of OPCIONAIS ?? []) {
        const produtoOpcional = await tx.produto.findFirst({
          where: {
            EMPRESAID,
            CODIGO: opc.CODOPCIONAL,
          },
        });

        await tx.item_opcional_pedido.create({
          data: {
            ...opc,
            IDOPCIONAL: produtoOpcional?.ID,
            CONSUMOPEDIDO: consumoCriado.ID,
            EMPRESAID,
          },
        });
      }

      for (const op of OPCOES ?? []) {
        const codProduto = consumoCriado.CODPRODUTO
          ? consumoCriado.CODPRODUTO
          : MONTADO.length > 0
            ? MONTADO.at(-1).CODPRODUTO
            : null;

        await tx.item_ingrediente_pedido.create({
          data: {
            ...op,
            CODPRODUTO: codProduto,
            CONSUMOPEDIDO: consumoCriado.ID,
            EMPRESAID,
          },
        });
      }

      for (const comboItem of COMBO_ITENS ?? []) {
        await tx.item_combo_pedido.create({
          data: {
            ...comboItem,
            CONSUMOPEDIDO: consumoCriado.ID,
            EMPRESAID,
          },
        });
      }
    }

    await tx.pedido.update({
      where: { ID: pedidoCriado.ID },
      data: { STATUS: "PENDENTE" },
    });

    return pedidoCriado;
  });
}

export async function listar_pedidos(EMPRESAID: number) {
  const pedidos = await prisma.pedido.findMany({
    where: { EMPRESAID, STATUS: "PENDENTE", TIPO: "FOOD" },
    include: {
      CLIENTE: true,
      consumo_pedido: {
        include: {
          itemAdicionalPedidos: true,
          itemIngredientePedidos: true,
          itemOpcionalPedidos: true,
          itemComboPedidos: true,
          itemMontadoPedidos: true,
        },
      },
      FORMA_PAGAMENTO: true,
    },
    orderBy: { ID: "desc" },
  });

  const data = pedidos.map(({ consumo_pedido, ...pedido }) => ({
    ...pedido,
    ITENS: consumo_pedido.map(
      ({
        itemAdicionalPedidos,
        itemIngredientePedidos,
        itemOpcionalPedidos,
        itemComboPedidos,
        itemMontadoPedidos,
        ...item
      }) => ({
        ...item,
        ADICIONAIS: itemAdicionalPedidos,
        OPCOES: itemIngredientePedidos,
        OPCIONAIS: itemOpcionalPedidos,
        MONTADO: itemMontadoPedidos,
        COMBO_ITENS: itemComboPedidos,
      }),
    ),
  }));

  return data;
}

export async function buscar_pedido_por_id(EMPRESAID: number, id: number) {
  return prisma.pedido.findFirst({
    where: {
      ID: id,
      EMPRESAID,
    },
  });
}
