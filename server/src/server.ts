import { PrismaClient } from "@prisma/client";

import fastify from "fastify";
import cors from "@fastify/cors";

import z from "zod";

import ShortUniqueId from "short-unique-id";

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

  server.get("/pools/count", async () => {
    const pools = await prisma.pool.count();

    return pools;
  });

  server.get("/users/count", async () => {
    const users = await prisma.user.count();

    return users;
  });

  server.get("/guesses/count", async () => {
    const guesses = await prisma.guess.count();

    return guesses;
  });

  server.post("/pools", async (request, reply) => {
    const bodySchema = z.object({
      title: z.string(),
    });

    const { title } = bodySchema.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    const pool = await prisma.pool.create({
      data: {
        title,
        code
      },
    });

    return reply.code(201).send({ code });
  });

  await server.listen({ port: 3333, /*0.0.0.0*/ });
}

bootstap();