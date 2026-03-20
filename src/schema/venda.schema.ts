import { z } from "zod";

const itemSchema = z.object({
  ADC_CODITEM: z.string(),
  ADICIONAL: z.string(),
  CANCELADO: z.number(),
  CODIGO: z.number(),
  CODSUBGRUPO: z.string(),
  COD_AGRUP: z.string(),
  COD_PRODUTO: z.string(),
  COD_USUARIO: z.string(),
  COD_VENDA: z.number(),
  COMBO: z.number().optional(),
  COMBO_CODITEM: z.string().optional(),
  COMPLEMENTO: z.string().optional(),
  COMPLEMENTO2: z.string().optional(),
  DATA: z.string(),
  DISPOSITIVO: z.string(),
  DISPOSITIVO_IMPRESSAO: z.string(),
  HORA: z.string(),
  IMPRESSO: z.number(),
  NAOSINCRONIZADO: z.number(),
  OPCIONAL: z.string(),
  PAGO: z.string(),
  PRODUTO: z.string(),
  PROMOCAO_DOBRO: z.number(),
  QTDE: z.number(),
  TOTAL: z.number(),
  TRANSF_MESA: z.number(),
  UNITARIO: z.number(),
});

const pagamentoSchema = z.object({
  VENDA_ID: z.number(),
  TIPO: z.string(),
  VALOR: z.number(),
  CODPAGAMENTO: z.number(),
});

export const vendaSchema = z
  .object({
    ACRESCIMO: z.number(),
    DESCONTO: z.number(),
    CODCAIXA: z.string(),
    CODCLIENTE: z.string(),
    CODVENDEDOR: z.string(),
    CODSISTEMA: z.string(),
    DATA: z.string(),
    HASH: z.string(),
    ID: z.number(),
    ITENS: z.array(itemSchema),
    MEIO_CARTAOCRED: z.number().default(0),
    MEIO_CARTAODEB: z.number().default(0),
    MEIO_DINHEIRO: z.number().default(0),
    MEIO_PIX: z.number().default(0),
    NFCE: z.number().default(0),
    OBS: z.string().optional(),
    PAGAMENTOS: z.array(pagamentoSchema),
    SITUACAO: z.number().default(0),
    SUBTOTAL: z.number(),
    TOTAL: z.number(),
  })
  .strict();

export const vendasSchema = z.array(vendaSchema);
