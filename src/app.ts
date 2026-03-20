import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";
import { prisma } from "./lib/prisma";
import empresaRoutes from "./routes/empresa.routes";
import produtoRoutes from "./routes/produto.routes";
import ingredienteRoutes from "./routes/ingrediente.routes";
import subgrupoRoutes from "./routes/subgrupo.routes";
import grupoRoutes from "./routes/grupo.routes";
import authRoutes from "./routes/auth.routes";
import pedidoRoutes from "./routes/pedido.routes";
import comboProdutoRoutes from "./routes/combo-produto.routes";
import comboRoutes from "./routes/combo.routes";
import funcionarioRoutes from "./routes/funcionario.routes";
import mesaComandaRoutes from "./routes/mesa-comanda.routes";
import produtoAdicionalRoutes from "./routes/produto-adicional.routes";
import produtoOpcionalRoutes from "./routes/produto-opcional.routes";
import produtoIngredienteRoutes from "./routes/produto-ingrediente.routes";
import vendedorRoutes from "./routes/vendedor.routes";
import vendaRoutes from "./routes/venda.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/dbtest", async (req, res, next) => {
  try {
    const result = await prisma.$queryRaw`SELECT '1'`;
    res.json({ db: "ok", result });
  } catch (err) {
    next(err);
  }
});

app.use("/auth", authRoutes);
app.use("/comboProduto", comboProdutoRoutes);
app.use("/combo", comboRoutes);
app.use("/funcionario", funcionarioRoutes);
app.use("/mesacomanda", mesaComandaRoutes);
app.use("/empresa", empresaRoutes);
app.use("/produto", produtoRoutes);
app.use("/produtoAdicional", produtoAdicionalRoutes);
app.use("/produtoIngrediente", produtoIngredienteRoutes);
app.use("/produtoOpcional", produtoOpcionalRoutes);
app.use("/grupo", grupoRoutes);
app.use("/vendedor", vendedorRoutes);
app.use("/venda", vendaRoutes);
app.use("/ingrediente", ingredienteRoutes);
app.use("/subgrupo", subgrupoRoutes);
app.use("/pedido", pedidoRoutes);

app.use(errorMiddleware);

export default app;
