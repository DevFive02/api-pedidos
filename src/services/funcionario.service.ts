import * as funcionarioRepository from "../repositories/funcionario.repository";

export async function listar_funcionarios(EMPRESAID: number) {
  const data = await funcionarioRepository.listar_funcionarios(EMPRESAID);

  return data
}

export async function listar_funcionario_codigo(
  EMPRESAID: number,
  CODIGO: string,
) {
  return await funcionarioRepository.listar_funcionario_codigo(EMPRESAID, CODIGO);
}

export async function upsert_funcionarios(
  EMPRESAID: number,
  funcionarios: any[],
) {
  const funcionariosSincronizados = [];

  for (const funcionario of funcionarios) {
    const resultado = await funcionarioRepository.upsert_funcionario(
      EMPRESAID,
      funcionario,
    );

    funcionariosSincronizados.push(resultado);
  }

  return funcionariosSincronizados;
}
