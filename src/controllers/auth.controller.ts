import { Request, Response } from "express";
import * as empresaRepository from "../repositories/empresa.repository";
import { comparar_secret } from "../utils/hash";
import { gerar_token } from "../utils/jwt";

export async function gerar_token_empresa(req: Request, res: Response) {
  const { client_id, client_secret } = req.body;

  if (!client_id || !client_secret) {
    return res.status(400).json({
      message: "client_id e client_secret obrigatórios",
    });
  }

  const empresa = await empresaRepository.buscar_por_client_id(client_id);

  if (!empresa) {
    return res.status(401).json({ message: "ID do cliente inválido!" });
  }

  const valido = await comparar_secret(client_secret, empresa.SECRET_HASH);

  if (!valido) {
    return res.status(401).json({ message: "Credenciais inválidas!" });
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Token válido por 7 dias

  const token = gerar_token(Number(empresa.ID));

  return res.status(201).json({ token, expiraEm: expiresAt.toISOString() });
}
