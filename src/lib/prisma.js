require("dotenv").config();

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  password: "Prot2468",
  database: "mysmurf",
  port: 3306
});

const prisma = new PrismaClient({
  adapter
});

module.exports = prisma;