export function tratarProduto(produto: any) {
  return {
    ...produto,
    PRECOVENDA: parsePreco(produto.PRECOVENDA),
    PRECO_PROMOCAO: parsePreco(produto.PRECO_PROMOCAO),
    SITUACAO: parseInt(produto.SITUACAO),
    QTDE_MAX_OPCOES: produto.QTDE_MAX_OPCOES
      ? parseInt(produto.QTDE_MAX_OPCOES)
      : null,
    QTDE_MAX_ADICIONAL: produto.QTDE_MAX_ADICIONAL
      ? parseInt(produto.QTDE_MAX_ADICIONAL)
      : null,
    QTDE_MAX_OPCIONAL: produto.QTDE_MAX_OPCIONAL
      ? parseInt(produto.QTDE_MAX_OPCIONAL)
      : null,
    PROMO_DELIVERY: produto.PROMO_DELIVERY
      ? parseInt(produto.PROMO_DELIVERY)
      : null,
    PROMO_MESA: produto.PROMO_MESA ? parseInt(produto.PROMO_MESA) : null,
    APP_CARDAPIO: produto.APP_CARDAPIO ? parseInt(produto.APP_CARDAPIO) : null,
    APP_DELIVERY: produto.APP_DELIVERY ? parseInt(produto.APP_DELIVERY) : null,
    USA_BALANCA: produto.USA_BALANCA ? parseInt(produto.USA_BALANCA) : null,
    USA_TALHERES: produto.USA_TALHERES ? parseInt(produto.USA_TALHERES) : null,
    USA_PONTO_CARNE: produto.USA_PONTO_CARNE
      ? parseInt(produto.USA_PONTO_CARNE)
      : null,
    USA_COPOS: produto.USA_COPOS ? parseInt(produto.USA_COPOS) : null,
    PRODUTO_COMBO: produto.PRODUTO_COMBO
      ? parseInt(produto.PRODUTO_COMBO)
      : null,
    HORARIO_PROMOCAO: produto.HORARIO_PROMOCAO
      ? parseInt(produto.HORARIO_PROMOCAO)
      : null,
    PROMO_DOBRO: produto.PROMO_DOBRO ? parseInt(produto.PROMO_DOBRO) : null,
  };
}

export function tratarCombo(combo: any) {
  return {
    ID_EXTERNO: parseInt(combo.ID),
    QTDE_MAX: parseInt(combo.QTDE_MAX),
    ORDEM: parseInt(combo.ORDEM),
    OBRIGATORIO: parseInt(combo.OBRIGATORIO),
    VALOR_BASE: parsePreco(combo.VALOR_BASE),
    DESCRICAO: combo.DESCRICAO,
    CODPRODUTO: combo.CODPRODUTO,
  };
}

export function tratarItemCombo(itemCombo: any) {
  return {
    ID_EXTERNO: parseInt(itemCombo.ID),
    COMBO_ID_EXTERNO: parseInt(itemCombo.COMBO_ID),
    CODPRODUTO: itemCombo.CODPRODUTO,
    VALOR: parsePreco(itemCombo.VALOR),
    QTDE: parseInt(itemCombo.QTDE),
  };
}

export function stringToArray(str: string) {
  try {
    const result = JSON.parse(str);
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}

export function parsePreco(valor: any): number {
  if (valor === null || valor === undefined) return 0;

  if (typeof valor === "number") return valor;

  if (typeof valor !== "string") return 0;

  const v = valor.trim();

  // Caso 1: formato brasileiro -> 1.234,56
  if (v.includes(",") && v.includes(".")) {
    const normalizado = v.replace(/\./g, "").replace(",", ".");
    const n = parseFloat(normalizado);
    return isNaN(n) ? 0 : n;
  }

  // Caso 2: decimal com vírgula -> 25,8
  if (v.includes(",") && !v.includes(".")) {
    const n = parseFloat(v.replace(",", "."));
    return isNaN(n) ? 0 : n;
  }

  // Caso 3: formato padrão -> 25.8 ou 25
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
}
