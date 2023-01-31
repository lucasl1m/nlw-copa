import { PrismaClient } from "@prisma/client";

import fastify from "fastify";
import cors from "@fastify/cors";

const prisma = new PrismaClient({
  log: ['query']}
);

async function bootstap() {
  const server = fastify({
    logger: true,
  });

  await server.register(cors, {
    origin: true,
  });

  server.get("/pools/count", async (request, reply) => {
    const pools = await prisma.pool.count();

    return pools;
  });

  await server.listen({ port: 3333, /*0.0.0.0*/ });
}

bootstap();