import { prisma } from "../lib/prisma";
import { serializeBigInt, tratarProduto } from "../utils";

export async function listar_produtos(EMPRESAID: number) {
  const produtos: any[] = await prisma.$queryRaw`
    SELECT CODIGO, 
    PRODUTO, 
    CODBARRA, 
    UNIDADE, 
    CODSUBGRUPO,
    PRECOCUSTO, 
    PRECOVENDA, 
    SITUACAO, 
    TIPO, 
    COALESCE(FAVORITO, '') AS FAVORITO,
    COALESCE(ADICIONAL, '') AS ADICIONAL,
    CODGRUPO, 
    COALESCE(MARCA, '') AS MARCA,
    GRUPO, 
    ESTOQUE_ATUAL,
    USA_BALANCA, 
    COALESCE(PRODUTO_MONTADO, '') AS PRODUTO_MONTADO,
    APP_PEDIDO_GARCOM,
    PRECO_PROMOCAO, 
    DT_INICIO_PROMOCAO, 
    DT_FIM_PROMOCAO,
    HORA_INICIO_PROMOCAO, 
    HORA_FIM_PROMOCAO, 
    HORARIO_PROMOCAO,
    VENDA_PROMOCAO, 
    APP_CARDAPIO, 
    PROMO_DOMINGO, 
    PROMO_SEGUNDA,
    PROMO_TERCA, 
    PROMO_QUARTA, 
    PROMO_QUINTA, 
    PROMO_SEXTA,
    PROMO_SABADO, 
    COALESCE(OPCIONAL, '') AS OPCIONAL,
    COALESCE(QTDE_MAX_OPCIONAL, 0) AS OPCIONAL_QTDEMAX,
    COALESCE(QTDE_MAX_OPCOES, 0) AS OP_QTDEMAX,
    COALESCE(USA_TALHERES, 0) AS USA_TALHERES,
    COALESCE(USA_PONTO_CARNE, 0) AS USA_PONTO_CARNE,
    COALESCE(USA_COPOS, 0) AS USA_COPOS,
    COALESCE(ACOMPANHAMENTO, '') AS ACOMPANHAMENTO,
    PROMO_DOBRO AS PROMOCAO_DOBRO,
    COALESCE(PRODUTO_COMBO, '') AS PRODUTO_COMBO
    FROM produto
    WHERE EMPRESAID = ${EMPRESAID}
    ORDER BY CODIGO
  `;

  const data = serializeBigInt(produtos);

  return data;
}

export async function listar_produto_foto(EMPRESAID: number, CODIGO: string) {
  const produto = await prisma.produto.findFirst({
    where: {
      EMPRESAID,
      CODIGO,
    },
    select: {
      FOTO: true,
    },
  });

  if (!produto || !produto.FOTO) {
    return null;
  }

  try {
    const urlFoto = `${process.env.SERVER_URL}/${produto.FOTO}`;
    const response = await fetch(urlFoto);
    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.startsWith("image")) {
      return null;
    }

    const buffer = await response.arrayBuffer();

    const base64 = Buffer.from(buffer).toString("base64");
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Erro ao converter imagem:", produto.FOTO);
    return null;
  }
}

export async function listar_produto_codigo(EMPRESAID: number, CODIGO: string) {
  const data: any = await prisma.$queryRaw`
    SELECT CODIGO, 
    PRODUTO, 
    CODBARRA, 
    UNIDADE, 
    CODSUBGRUPO,
    PRECOCUSTO, 
    PRECOVENDA, 
    SITUACAO, 
    TIPO, 
    COALESCE(FAVORITO, '') AS FAVORITO,
    COALESCE(ADICIONAL, '') AS ADICIONAL,
    CODGRUPO, 
    COALESCE(MARCA, '') AS MARCA,
    GRUPO, 
    ESTOQUE_ATUAL,
    USA_BALANCA, 
    COALESCE(PRODUTO_MONTADO, '') AS PRODUTO_MONTADO,
    APP_PEDIDO_GARCOM,
    PRECO_PROMOCAO, 
    DT_INICIO_PROMOCAO, 
    DT_FIM_PROMOCAO,
    HORA_INICIO_PROMOCAO, 
    HORA_FIM_PROMOCAO, 
    HORARIO_PROMOCAO,
    VENDA_PROMOCAO, 
    APP_CARDAPIO, 
    PROMO_DOMINGO, 
    PROMO_SEGUNDA,
    PROMO_TERCA, 
    PROMO_QUARTA, 
    PROMO_QUINTA, 
    PROMO_SEXTA,
    PROMO_SABADO, 
    COALESCE(OPCIONAL, '') AS OPCIONAL,
    COALESCE(QTDE_MAX_OPCIONAL, 0) AS OPCIONAL_QTDEMAX,
    COALESCE(QTDE_MAX_OPCOES, 0) AS OP_QTDEMAX,
    COALESCE(USA_TALHERES, 0) AS USA_TALHERES,
    COALESCE(USA_PONTO_CARNE, 0) AS USA_PONTO_CARNE,
    COALESCE(USA_COPOS, 0) AS USA_COPOS,
    COALESCE(ACOMPANHAMENTO, '') AS ACOMPANHAMENTO,
    PROMO_DOBRO AS PROMOCAO_DOBRO,
    COALESCE(PRODUTO_COMBO, '') AS PRODUTO_COMBO
    FROM produto
    WHERE EMPRESAID = ${EMPRESAID} AND CODIGO = ${CODIGO}
    ORDER BY CODIGO
  `;

  const produto = serializeBigInt(data[0]);

  return produto;
}

export async function upsert_produto(EMPRESAID: number, produto: any) {
  const produtoFinal = tratarProduto(produto);

  const existente = await prisma.produto.findFirst({
    where: {
      EMPRESAID,
      CODIGO: produto.CODIGO,
    },
  });

  let dados = null;

  if (existente) {
    dados = await prisma.produto.update({
      data: produtoFinal,
      where: {
        ID: existente.ID,
      },
    });
  } else {
    dados = await prisma.produto.create({
      data: {
        ...produtoFinal,
        EMPRESAID,
      },
    });
  }

  return dados;
}

export async function listar_produto_id(EMPRESAID: number, ID: number) {
  return await prisma.produto.findFirst({
    where: {
      EMPRESAID,
      ID,
    },
  });
}

export async function listar_produtos_cardapio(EMPRESAID: number) {
  const produtos = await prisma.produto.findMany({
    where: {
      EMPRESAID,
      APP_DELIVERY: 1,
    },
    orderBy: {
      CODIGO: "asc",
    },
    include: {
      combos: {
        include: {
          combo_produtos: true,
        },
      },
      produtoAdicionais: {
        include: {
          produto: true,
        },
      },
      produtoIngredientes: {
        include: {
          ingrediente: true,
        },
      },
      produtoOpcionais: true,
    },
  });

  return produtos;
}
