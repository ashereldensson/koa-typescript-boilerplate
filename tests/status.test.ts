import request from "supertest";

import { startServer } from "./helpers";

test("Status page returns 200 OK", async () => {
  const server = await startServer();
  const response = await request(server).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Status");
});