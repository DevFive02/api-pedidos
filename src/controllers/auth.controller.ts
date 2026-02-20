import { Request, Response } from "express";
import * as repo from "../repositories/empresa.repository";
import { comparar_secret } from "../utils/hash";
import { gerar_token } from "../utils/jwt";

export async function gerar_token_empresa(req: Request, res: Response) {
  const { client_id, client_secret } = req.body;

  if (!client_id || !client_secret) {
    return res.status(400).json({
      message: "client_id e client_secret obrigatórios",
    });
  }

  const empresa = await repo.buscar_por_client_id(client_id);

  if (!empresa) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const valido = await comparar_secret(client_secret, empresa.secret_hash);

  if (!valido) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);

  const token = gerar_token(Number(empresa.id));

  return res.json({ token, expiraEm: expiresAt.toISOString() });
}
