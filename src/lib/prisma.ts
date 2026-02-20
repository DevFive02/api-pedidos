import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "pedidos",
  password: "pedidos",
  database: "pedidos",
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
