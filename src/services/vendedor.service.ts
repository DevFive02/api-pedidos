import * as vendedorRepository from "../repositories/vendedor.repository";

export async function listar_vendedores(EMPRESAID: number) {
  return await vendedorRepository.listar_vendedores(EMPRESAID);
}

export async function listar_vendedores_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return await vendedorRepository.listar_vendedores_codigo(EMPRESAID, CODIGO);
}

export async function upsert_vendedores(EMPRESAID: number, vendedores: any[]) {
  const vendedoresSincronizados = [];

  for (const vendedor of vendedores) {
    const resultado = await vendedorRepository.upsert_vendedor(
      EMPRESAID,
      vendedor,
    );

    vendedoresSincronizados.push(resultado);
  }

  return vendedoresSincronizados;
}
