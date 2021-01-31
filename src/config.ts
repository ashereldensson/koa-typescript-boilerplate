import dotenv from "dotenv";

dotenv.config({ path: ".env" });

interface DBConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}

const dbConfig: DBConfig = {
  host: process.env.DATABASE_HOST || "localhost",
  port: +(process.env.DATABASE_PORT || 5432),
  user: process.env.DATABASE_USER || "user",
  password: process.env.DATABASE_PASSWORD || "pass",
  name: process.env.DATABASE_NAME || "koa_app",
};

const databaseUrl = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

export interface Config {
  env: string;
  version: string;
  port: number;
  debugLogging: boolean;
  dbsslconn: boolean;
  jwtSecret: string;
  swaggerUsername: string;
  swaggerPass: string;
  databaseUrl: string;
  dbEntitiesPath: string[];
}

const isDevMode = process.env.NODE_ENV == "dev";
const isTestMode = process.env.NODE_ENV == "test";

const config: Config = {
  env: process.env.NODE_ENV || "dev",
  version: process.env.npm_package_version || "0.0.0",
  port: +(process.env.PORT || 3000),
  debugLogging: (isDevMode || isTestMode),
  dbsslconn: !(isDevMode || isTestMode),
  jwtSecret: process.env.JWT_SECRET || "my-jwt-secret",
  swaggerUsername: process.env.SWAGGER_USERNAME || "user",
  swaggerPass: process.env.SWAGGER_PASS || "pass",
  databaseUrl,
  dbEntitiesPath: [
    ...(isDevMode || isTestMode) ? ["src/entity/**/*.ts"] : ["dist/entity/**/*.js"],
  ],
};

export { config };
