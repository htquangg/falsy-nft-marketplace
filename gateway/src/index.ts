import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import { config } from "dotenv";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createBuiltMeshHTTPHandler } from "../.mesh";

async function main(): Promise<void> {
  config();

  const app = fastify({
    logger: true,
  });

  const meshHttp = createBuiltMeshHTTPHandler();

  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    secret: process.env.SESSION_SECRET,
  });

  app.route({
    url: "/graphql",
    method: ["GET", "POST", "OPTIONS"],
    async handler(req: FastifyRequest, reply: FastifyReply) {
      // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
      const response: Response = await meshHttp.handleNodeRequest(req, {
        req,
        reply,
      });

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);

      reply.send(response.body);

      return reply;
    },
  });

  app.listen({ port: +process.env.PORT }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main();
