import { Request, Response, NextFunction } from "express";
import * as service from "../services/empresa.service";
import { gerar_token } from "../utils/jwt";

export async function criar_empresa(req: Request, res: Response) {
  const dados = req.body;
  const { senha, ...dadosEmpresa } = dados;

  const existeEmpresa = await service.empresa_por_cnpj(dadosEmpresa.CNPJ);

  if (!existeEmpresa) {
    if (senha !== "NiIsInR5cCI6IkpXVCJ9") {
      return res.status(500).json({ mensagem: "Não autorizado!" });
    }
  }

  const { empresa, client_secret, sincronizado } =
    await service.criar_empresa(dadosEmpresa);

  if (sincronizado) {
    return res.status(200).json({
      mensagem: "Empresa já cadastrada e sincronizada.",
    });
  } else {
    const token = gerar_token(Number(empresa.ID));

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    return res.status(201).json({
      empresa: {
        id: empresa.ID,
        filial: empresa.FILIAL,
        client_id: empresa.CLIENT_ID,
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

export async function listar_empresa(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;

    const empresa = await service.listar_empresa(empresa_id);

    return res.json(empresa);
  } catch (err) {
    next(err);
  }
}

export async function listar_empresa_codigo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const empresa_id = req.EMPRESAID!;
    const { codigo } = req.params;

    const empresa = await service.listar_empresa_codigo(
      empresa_id,
      String(codigo),
    );

    if (!empresa) {
      return res.status(404).json({ mensagem: "Empresa não encontrada" });
    }

    return res.json(empresa);
  } catch (err) {
    next(err);
  }
}
