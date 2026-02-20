import * as pedidoRepository from "../repositories/pedido.repository";

export async function criar_pedido(EMPRESAID: number, payload: any) {
  if (!payload.ITENS.length) {
    throw new Error("Pedido sem itens")
  }

  return pedidoRepository.criar_pedido(EMPRESAID, payload);
}

export async function listar_pedidos(EMPRESAID: number) {
  return pedidoRepository.listar_pedidos(EMPRESAID);
}

export async function buscar_pedido_por_id(EMPRESAID: number, id: number) {
  return pedidoRepository.buscar_pedido_por_id(EMPRESAID, id);
}
