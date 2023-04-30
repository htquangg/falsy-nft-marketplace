import fastifyCookie from "@fastify/cookie";
import fastifySession from "@mgcrea/fastify-session";
import RedisStore from "@mgcrea/fastify-session-redis-store";
import { config } from "dotenv";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import Redis from "ioredis";
import { createBuiltMeshHTTPHandler } from "../.mesh";
import { User } from "./types/user.type";

declare module "@mgcrea/fastify-session" {
  interface SessionData {
    user: User;
  }
}

const SESSION_TTL = 86400; // 1 day in seconds

async function main(): Promise<void> {
  config();

  const app = fastify({
    logger: true,
  });

  const meshHttp = createBuiltMeshHTTPHandler();

  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    store: new RedisStore({
      client: new Redis(process.env.REDIS_URL),
      ttl: SESSION_TTL,
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      // domain: process.env.MARKETPLACE_DOMAIN as string,
      path: "/",
      httpOnly: process.env.NODE_ENV === "production",
      maxAge: SESSION_TTL,
      // sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  });

  app.route({
    url: "/graphql",
    method: ["GET", "POST", "OPTIONS"],
    async handler(req: FastifyRequest, reply: FastifyReply) {
      const response: Response = await meshHttp.handleNodeRequest(req, {
        req,
        reply,
      });

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      // Init session if user is authenticated
      if (req.method === "POST") {
        const { operationName } = req.body as any;
        switch (operationName) {
          case "login":
            const resp = await response.json();
            if (resp.data.login) {
              const user: User = {
                address: resp.data.login,
              };
              req.session.set("user", user);
            }
            break;
          case "logout":
            if (req.session.get("user")) {
              await req.session.destroy();
            }
            break;
          default:
            break;
        }
      }

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
