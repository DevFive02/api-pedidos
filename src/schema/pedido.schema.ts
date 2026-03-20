import { z } from "zod";

const comboItemSchema = z
  .object({
    CODPRODUTO: z.string(),
    QTDE: z.number(),
    PRECO: z.number(),
    CODITEM: z.string(),
  })
  .strict();

const opcoesItemSchema = z
  .object({
    CODINGREDIENTE: z.string(),
  })
  .strict();

const opcionaisItemSchema = z
  .object({
    CODOPCIONAL: z.string(),
    QTDE: z.number(),
  })
  .strict();

const adicionaisItemSchema = z
  .object({
    CODADICIONAL: z.string(),
    QTDE: z.number(),
    PRECO: z.number(),
  })
  .strict();

const montadoItemSchema = z
  .object({
    CODPRODUTO: z.string(),
    PRECO: z.number(),
  })
  .strict();

const itemSchema = z
  .object({
    CODPRODUTO: z.string(),
    PRODUTO: z.string(),
    QTDE: z.number().min(1),
    UNITARIO: z.number(),
    COMPLEMENTO: z.string().optional().nullable(),
    COMPLEMENTO2: z.string().optional().nullable(),
    CODSUBGRUPO: z.string().optional().nullable(),
    ADICIONAL: z.string().optional().nullable(),
    ADC_CODITEM: z.string().optional().nullable(),
    TOTAL: z.number(),
    DATA: z.string(),
    COMBO_ITENS: z.array(comboItemSchema).optional(),
    OPCOES: z.array(opcoesItemSchema).optional(),
    OPCIONAIS: z.array(opcionaisItemSchema).optional(),
    ADICIONAIS: z.array(adicionaisItemSchema).optional(),
    MONTADO: z.array(montadoItemSchema).optional(),
  })
  .strict();

const clienteSchema = z
  .object({
    ID: z.number(),
    NOME: z.string(),
    TELEFONE: z.string(),
    ENDERECO: z.string(),
    NUMERO: z.string(),
    COMPLEMENTO: z.string().optional(),
    BAIRRO: z.string(),
    CIDADE: z.string(),
    UF: z.string().length(2),
    CEP: z.string(),
  })
  .strict();

const pagamentoSchema = z
  .object({
    DESCRICAO: z.string(),
    VALOR: z.number(),
  })
  .strict();

const pedidoSchema = z
  .object({
    ID: z.number(),
    TOTAL: z.number(),
    SUBTOTAL: z.number(),
    DATA: z.string(),
    HORA: z.string(),
    CLIENTE: clienteSchema,
    PAGAMENTO: pagamentoSchema,
    OBS: z.string().optional().nullable(),
    VALOR_TROCO: z.number().optional().nullable(),
    VALOR_ENTREGA: z.number().optional().nullable(),
    COD_CUPOM: z.string().optional().nullable(),
    ITENS: z.array(itemSchema).min(1),
  })
  .strict();

export const pedidosSchema = z.array(pedidoSchema);
