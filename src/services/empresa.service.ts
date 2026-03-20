import * as empresaRepository from "../repositories/empresa.repository";
import { hash_secret } from "../utils/hash";
import { gerar_secret } from "../utils/secret";
import crypto from "crypto";

export async function criar_empresa(dados: any) {
  let empresa = await empresa_por_cnpj(dados.CNPJ);

  if (empresa) {
    return {
      empresa,
      client_secret: null,
      sincronizado: true,
    };
  }

  const client_id = crypto.randomUUID();
  const client_secret = gerar_secret();
  const secret_hash = await hash_secret(client_secret);

  empresa = await empresaRepository.criar({
    ...dados,
    CLIENT_ID: client_id,
    SECRET_HASH: secret_hash,
  });

  return {
    empresa,
    client_secret,
    sincronizado: false,
  };
}

export async function rotacionar_secret(empresa_id: number) {
  const novo_secret = gerar_secret();
  const novo_hash = await hash_secret(novo_secret);

  await empresaRepository.atualizar_secret(empresa_id, novo_hash);

  return novo_secret;
}

export async function empresa_por_cnpj(cnpj: string) {
  const empresa = await empresaRepository.buscar_por_cnpj(cnpj);

  return empresa;
}

export async function listar_empresa(id: number) {
  const empresa = await empresaRepository.listar_empresa(id);
  return empresa;
}

export async function listar_empresa_codigo(id: number, codigo: string) {
  const empresa = await empresaRepository.listar_empresa_codigo(id, codigo);
  return empresa;
}
