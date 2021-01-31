import Router from "@koa/router";
import { SwaggerRouter } from "koa-swagger-decorator";

import { config } from "./config";
import { status, auth } from "./routes";

const noAuthRouter = new Router();
const authRouter = new SwaggerRouter();

noAuthRouter.get("/", status.appStatus);
authRouter.get("/auth", auth.protectedEndpoint);

// Swagger
authRouter.swagger({
  title: "Koa Typescript Boilerplate",
  description: "Koa Typescript Boilerplate - API Documentation",
  version: config.version
});

authRouter.mapDir(__dirname);

export { noAuthRouter, authRouter };