-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 17/01/2026 às 01:26
-- Versão do servidor: 11.4.3-MariaDB
-- Versão do PHP: 8.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `fivebarelanchonente`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `combo`
--

CREATE TABLE `combo` (
  `ID` int(11) NOT NULL,
  `DESCRICAO` varchar(100) DEFAULT NULL,
  `QTDE_MAX` int(11) DEFAULT NULL,
  `ORDEM` int(11) DEFAULT NULL,
  `CODPRODUTO` varchar(6) DEFAULT NULL,
  `OBRIGATORIO` int(11) DEFAULT NULL,
  `VALOR_BASE` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `combo_produtos`
--

CREATE TABLE `combo_produtos` (
  `ID` int(11) NOT NULL,
  `COMBO_ID` int(11) DEFAULT NULL,
  `CODPRODUTO` varchar(6) DEFAULT NULL,
  `VALOR` double DEFAULT NULL,
  `QTDE` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `consumo_delivery`
--

CREATE TABLE `consumo_delivery` (
  `CODIGO` int(11) NOT NULL,
  `COD_USUARIO` varchar(6) DEFAULT NULL,
  `COD_PRODUTO` varchar(6) DEFAULT NULL,
  `PRODUTO` varchar(100) DEFAULT NULL,
  `QTDE` float DEFAULT NULL,
  `UNITARIO` float DEFAULT NULL,
  `TOTAL` float DEFAULT NULL,
  `TRANSF_MESA` int(11) DEFAULT NULL,
  `CANCELADO` int(11) DEFAULT NULL,
  `HORA` varchar(10) DEFAULT NULL,
  `COMPLEMENTO` varchar(100) DEFAULT NULL,
  `COMPLEMENTO2` varchar(200) DEFAULT NULL,
  `IMPRESSO` int(11) DEFAULT NULL,
  `COD_AGRUP` varchar(10) DEFAULT NULL,
  `CODSUBGRUPO` varchar(6) DEFAULT NULL,
  `ADICIONAL` varchar(2) DEFAULT NULL,
  `ADC_CODITEM` varchar(10) DEFAULT NULL,
  `COD_TEMP` varchar(45) DEFAULT NULL,
  `NAOSINCRONIZADO` int(11) DEFAULT NULL,
  `DATA` varchar(45) DEFAULT NULL,
  `DISPOSITIVO` varchar(60) DEFAULT NULL,
  `PAGO` varchar(5) DEFAULT NULL,
  `COD_PEDIDO` int(11) NOT NULL,
  `COMBO_CODITEM` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `grupo`
--

CREATE TABLE `grupo` (
  `CODIGO` varchar(6) NOT NULL,
  `GRUPO` varchar(60) NOT NULL,
  `NAO_MOSTRA_KYOSK` varchar(2) DEFAULT NULL,
  `FOTO` text DEFAULT NULL,
  `APP_CARDAPIO` int(11) NOT NULL,
  `APP_DELIVERY` int(11) NOT NULL,
  `SEQUENCIA` int(11) NOT NULL,
  `HORA_INICIO` varchar(45) DEFAULT NULL,
  `HORA_FIM` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ingrediente`
--

CREATE TABLE `ingrediente` (
  `CODIGO` varchar(6) NOT NULL,
  `NOME` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_adicional_delivery`
--

CREATE TABLE `item_adicional_delivery` (
  `ID` int(11) NOT NULL,
  `CODADICIONAL` varchar(6) DEFAULT NULL,
  `QTDE` double DEFAULT NULL,
  `PRECO` double DEFAULT NULL,
  `CODITEM` varchar(6) DEFAULT NULL,
  `CONSUMODELIVERY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_combo_delivery`
--

CREATE TABLE `item_combo_delivery` (
  `ID` int(11) NOT NULL,
  `CODPRODUTO` varchar(6) DEFAULT NULL,
  `QTDE` double DEFAULT NULL,
  `PRECO` double DEFAULT NULL,
  `CODITEM` varchar(6) DEFAULT NULL,
  `CONSUMODELIVERY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_ingrediente_delivery`
--

CREATE TABLE `item_ingrediente_delivery` (
  `ID` int(11) NOT NULL,
  `CODIGO` varchar(45) DEFAULT NULL,
  `CODVENDA` int(11) DEFAULT NULL,
  `CODPRODUTO` varchar(6) DEFAULT NULL,
  `CODINGREDIENTE` varchar(6) DEFAULT NULL,
  `CODITEM` varchar(6) DEFAULT NULL,
  `CANCELADO` int(11) DEFAULT NULL,
  `PAGO` varchar(5) DEFAULT NULL,
  `CONSUMODELIVERY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_montado_delivery`
--

CREATE TABLE `item_montado_delivery` (
  `ID` int(11) NOT NULL,
  `CODPRODUTO` varchar(6) DEFAULT NULL,
  `PRECO` double DEFAULT NULL,
  `CONSUMODELIVERY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_opcional_delivery`
--

CREATE TABLE `item_opcional_delivery` (
  `ID` int(11) NOT NULL,
  `CODOPCIONAL` varchar(6) DEFAULT NULL,
  `CODITEM` varchar(6) DEFAULT NULL,
  `CONSUMODELIVERY` int(11) DEFAULT NULL,
  `QTDE` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedido`
--

CREATE TABLE `pedido` (
  `ID` int(11) NOT NULL,
  `CLIENTE_ID` int(11) NOT NULL,
  `VALOR` float NOT NULL,
  `PAGAMENTO` varchar(100) NOT NULL,
  `ENTREGA` varchar(100) NOT NULL,
  `VALOR_TROCO` float DEFAULT NULL,
  `DESEJA_RECIBO` int(11) NOT NULL,
  `INFO_RECIBO` varchar(100) DEFAULT NULL,
  `DATA` varchar(100) DEFAULT NULL,
  `HORA` varchar(100) DEFAULT NULL,
  `COD_CUPOM` int(11) DEFAULT NULL,
  `VALOR_ENTREGA` double NOT NULL,
  `STATUS` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `CODIGO` varchar(6) NOT NULL,
  `PRODUTO` varchar(100) NOT NULL,
  `UNIDADE` varchar(3) DEFAULT NULL,
  `PRECOVENDA` float NOT NULL,
  `SITUACAO` int(11) NOT NULL,
  `ADICIONAL` varchar(2) DEFAULT 'N',
  `CODGRUPO` varchar(6) DEFAULT NULL,
  `CODSUBGRUPO` varchar(6) DEFAULT '000000',
  `PRODUTO_MONTADO` varchar(2) DEFAULT NULL,
  `MOSTRA_KYOSK_APP` varchar(2) DEFAULT NULL,
  `PRECO_PROMOCAO` float DEFAULT NULL,
  `DT_INICIO_PROMOCAO` varchar(45) DEFAULT NULL,
  `DT_FIM_PROMOCAO` varchar(45) DEFAULT NULL,
  `HORA_INICIO_PROMOCAO` varchar(45) DEFAULT NULL,
  `HORA_FIM_PROMOCAO` varchar(45) DEFAULT NULL,
  `HORARIO_PROMOCAO` int(11) DEFAULT NULL,
  `USA_BALANCA` int(11) DEFAULT NULL,
  `USA_TALHERES` int(11) DEFAULT NULL,
  `USA_PONTO_CARNE` int(11) DEFAULT NULL,
  `USA_COPOS` int(11) DEFAULT NULL,
  `ACOMPANHAMENTO` varchar(200) DEFAULT NULL,
  `FOTO` varchar(200) DEFAULT NULL,
  `OPCIONAL` varchar(2) DEFAULT 'N',
  `QTDE_MAX_OPCIONAL` int(11) DEFAULT NULL,
  `QTDE_MAX_OPCOES` int(11) DEFAULT NULL,
  `DESTAQUE` varchar(2) DEFAULT 'N',
  `PROMO_DIAS_SEMANA` varchar(45) DEFAULT NULL,
  `PROMO_DELIVERY` int(11) NOT NULL,
  `PROMO_MESA` int(11) NOT NULL,
  `APP_CARDAPIO` int(11) NOT NULL,
  `APP_DELIVERY` int(11) NOT NULL,
  `PROMO_DOBRO` int(11) NOT NULL,
  `QTDE_MAX_ADICIONAL` int(11) NOT NULL,
  `PRODUTO_COMBO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto_adicional`
--

CREATE TABLE `produto_adicional` (
  `CODIGO` varchar(6) NOT NULL,
  `CODPRODUTO` varchar(6) NOT NULL,
  `PROD_ADICIONAL` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto_ingrediente`
--

CREATE TABLE `produto_ingrediente` (
  `CODIGO` varchar(6) NOT NULL,
  `CODPRODUTO` varchar(6) NOT NULL,
  `CODINGREDIENTE` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto_opcional`
--

CREATE TABLE `produto_opcional` (
  `CODIGO` int(11) NOT NULL,
  `CODPRODUTO` varchar(6) NOT NULL,
  `CODOPCIONAL` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `subgrupo`
--

CREATE TABLE `subgrupo` (
  `CODIGO` varchar(6) NOT NULL,
  `CODGRUPO` varchar(6) NOT NULL,
  `SUBGRUPO` varchar(50) NOT NULL,
  `TITULO_SELETOR` varchar(50) DEFAULT NULL,
  `QTDE_MAX_KYOSK` int(11) DEFAULT NULL,
  `NAO_MOSTRA_KYOSK` varchar(2) DEFAULT NULL,
  `DESTAQUE` varchar(2) DEFAULT 'N',
  `FOTO` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `combo`
--
ALTER TABLE `combo`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `combo_produtos`
--
ALTER TABLE `combo_produtos`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `consumo_delivery`
--
ALTER TABLE `consumo_delivery`
  ADD PRIMARY KEY (`CODIGO`),
  ADD KEY `fk_consumo_delivery_produto1_idx` (`COD_PRODUTO`),
  ADD KEY `consumo_delivery_FK` (`COD_PEDIDO`);

--
-- Índices de tabela `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`CODIGO`);

--
-- Índices de tabela `ingrediente`
--
ALTER TABLE `ingrediente`
  ADD PRIMARY KEY (`CODIGO`);

--
-- Índices de tabela `item_adicional_delivery`
--
ALTER TABLE `item_adicional_delivery`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_item_adicional_consumo_delivery1_idx` (`CONSUMODELIVERY`);

--
-- Índices de tabela `item_combo_delivery`
--
ALTER TABLE `item_combo_delivery`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `item_ingrediente_delivery`
--
ALTER TABLE `item_ingrediente_delivery`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_item_ingrediente_consumo_delivery1_idx` (`CONSUMODELIVERY`);

--
-- Índices de tabela `item_montado_delivery`
--
ALTER TABLE `item_montado_delivery`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_item_montado_consumo_delivery1_idx` (`CONSUMODELIVERY`),
  ADD KEY `fk_item_montado_produto1_idx` (`CODPRODUTO`);

--
-- Índices de tabela `item_opcional_delivery`
--
ALTER TABLE `item_opcional_delivery`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_item_opcional_consumo_delivery1_idx` (`CONSUMODELIVERY`);

--
-- Índices de tabela `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `pedido_FK` (`CLIENTE_ID`),
  ADD KEY `pedido_FK_1` (`COD_CUPOM`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`CODIGO`),
  ADD KEY `fk_produto_grupo_idx` (`CODGRUPO`);

--
-- Índices de tabela `produto_adicional`
--
ALTER TABLE `produto_adicional`
  ADD PRIMARY KEY (`CODIGO`),
  ADD KEY `fk_produto_adicional_produto1_idx` (`CODPRODUTO`);

--
-- Índices de tabela `produto_ingrediente`
--
ALTER TABLE `produto_ingrediente`
  ADD PRIMARY KEY (`CODIGO`),
  ADD KEY `fk_produto_ingrediente_produto1_idx` (`CODPRODUTO`),
  ADD KEY `fk_produto_ingrediente_ingrediente1_idx` (`CODINGREDIENTE`);

--
-- Índices de tabela `produto_opcional`
--
ALTER TABLE `produto_opcional`
  ADD PRIMARY KEY (`CODIGO`),
  ADD KEY `fk_produto_opcional_produto1_idx` (`CODPRODUTO`);

--
-- Índices de tabela `subgrupo`
--
ALTER TABLE `subgrupo`
  ADD PRIMARY KEY (`CODIGO`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `consumo_delivery`
--
ALTER TABLE `consumo_delivery`
  MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `item_adicional_delivery`
--
ALTER TABLE `item_adicional_delivery`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `item_combo_delivery`
--
ALTER TABLE `item_combo_delivery`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `item_ingrediente_delivery`
--
ALTER TABLE `item_ingrediente_delivery`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `item_montado_delivery`
--
ALTER TABLE `item_montado_delivery`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `item_opcional_delivery`
--
ALTER TABLE `item_opcional_delivery`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedido`
--
ALTER TABLE `pedido`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `consumo_delivery`
--
ALTER TABLE `consumo_delivery`
  ADD CONSTRAINT `consumo_delivery_FK` FOREIGN KEY (`COD_PEDIDO`) REFERENCES `pedido` (`ID`),
  ADD CONSTRAINT `fk_consumo_delivery_produto1` FOREIGN KEY (`COD_PRODUTO`) REFERENCES `produto` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
