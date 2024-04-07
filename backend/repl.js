const express = require("express");
const { GracefulShutdownServer } = require("medusa-core-utils");
const repl = require("node:repl");

const loaders = require("@medusajs/medusa/dist/loaders/index").default;
(async () => {
  async function start() {
    const app = express();
    const directory = process.cwd();

    try {
      const { container } = await loaders({
        directory,
        expressApp: app,
      });
      return container;
    } catch (err) {
      console.error("Error starting server", err);
      process.exit(1);
    }
  }

  const container = await start();
  repl.start("> ").context.container = container;
})();
