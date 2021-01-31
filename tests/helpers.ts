import { memoize } from "lodash";

import { createServer } from "../src/server";

const startServer = memoize(async () => {
  return (await createServer()).listen();
});

afterAll(async () => {
  // Memoize the server so it won't start more than one instance.
  const server = await startServer();

  // We need to close the server
  server.close();
});

export { startServer };
