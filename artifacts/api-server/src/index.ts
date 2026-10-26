import app from "./app";
import { logger } from "./lib/logger";
import { seedLegacyPortfolioAssets } from "./lib/seedLegacyPortfolioAssets";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function startServer() {
  const importedAssetCount = await seedLegacyPortfolioAssets();
  if (importedAssetCount > 0) {
    logger.info({ importedAssetCount }, "Imported legacy portfolio assets");
  }

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
}

void startServer().catch((err: unknown) => {
  logger.error({ err }, "Failed to initialize the API server");
  process.exit(1);
});
