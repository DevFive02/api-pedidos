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

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/db-test", async (req, res, next) => {
  try {
    const result = await prisma.$queryRaw`SELECT '1'`;
    res.json({ db: "ok", result });
  } catch (err) {
    next(err);
  }
});

app.use("/empresa", empresaRoutes);
app.use("/auth", authRoutes);
app.use("/produto", produtoRoutes);
app.use("/grupo", grupoRoutes);
app.use("/ingrediente", ingredienteRoutes);
app.use("/subgrupo", subgrupoRoutes);
app.use("/pedido", pedidoRoutes);

app.use(errorMiddleware);

export default app;
