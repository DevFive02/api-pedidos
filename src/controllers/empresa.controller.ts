import { Request, Response, NextFunction } from "express";
import * as service from "../services/empresa.service";
import { gerar_token } from "../utils/jwt";

export async function criar_empresa(req: Request, res: Response) {
  const { cnpj, razao, senha } = req.body;

  const existeEmpresa = await service.empresa_por_cnpj(cnpj);

  if (!existeEmpresa) {
    if (senha !== "NiIsInR5cCI6IkpXVCJ9") {
      return res.status(500).json({ mensagem: "Não autorizado!" });
    }
  }

  const { empresa, client_secret, sincronizado } = await service.criar_empresa(
    cnpj,
    razao,
  );

  const token = gerar_token(Number(empresa.id));

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);

  if (sincronizado) {
    return res.status(201).json({
      token,
      expiraEm: expiresAt.toISOString(),
    });
  } else {
    return res.status(201).json({
      empresa: {
        id: empresa.id,
        razao: empresa.razao,
        client_id: empresa.client_id,
      },
      client_secret,
      token,
      expiraEm: expiresAt.toISOString(), // ISO 8601
    });
  }
}

export async function rotacionar_secret(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;

    const novo_secret = await service.rotacionar_secret(empresa_id);

    return res.json({ client_secret: novo_secret });
  } catch (err) {
    next(err);
  }
}
