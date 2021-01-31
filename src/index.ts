import { config } from "./config";
import { createServer } from "./server";

if (config.env != "test") {
  createServer().then(
    app =>
      app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
      }),
    error => {
      console.log("Could not start the server due to:", error);
      process.exit(1);
    }
  );
}
