import Koa from "koa";
import jwt from "koa-jwt";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import winston from "winston";
import { createConnection } from "typeorm";
import mount from "koa-mount";
import auth from "koa-basic-auth";
import "reflect-metadata";

import { config } from "./config";
import { logger } from "./logger";
import { noAuthRouter, authRouter } from "./router";

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export async function createServer(): Promise<Koa> {

  try {
    await createConnection({
      type: "postgres",
      url: config.databaseUrl,
      synchronize: true,
      logging: false,
      entities: config.dbEntitiesPath,
      extra: {
        ssl: config.dbsslconn, // If the env is "dev" or "test", don't use SSL.
      }
    });
  } catch (error: unknown) {
    console.log("TypeORM connection error: ", error);
    throw error;
  }

  const app: Koa = new Koa();

  // Security headers
  app.use(helmet());

  // CORS
  app.use(cors());

  // Logger
  app.use(logger(winston));

  // Koa body parser
  app.use(bodyParser());

  // Swagger - Require basic auth
  app.use(mount("/swagger-json", auth({ name: config.swaggerUsername, pass: config.swaggerPass })));
  app.use(mount("/swagger-html", auth({ name: config.swaggerUsername, pass: config.swaggerPass })));

  // Routes - Don't require authentication
  app.use(noAuthRouter.routes()).use(noAuthRouter.allowedMethods());

  // JWT - Routes after this line will require authentication. Exclude Swagger; which is behind basic auth.
  app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }));

  // Routes - Require authentication
  app.use(authRouter.routes()).use(authRouter.allowedMethods());

  return app;
}
