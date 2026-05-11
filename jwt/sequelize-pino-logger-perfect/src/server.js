import app from './app.js';
import config from './config/index.js';
import { connectDb, closeDb } from './utils/dbHelper.js';
import { logger } from './utils/loggerHelper.js';
import './models/index.js';

async function bootstrap() {
  await connectDb();

  const server = app.listen(config.port, () => {
    logger.info(`Server is running on http://localhost:${config.port}`);
  });

  const shutdown = async (signal) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);

    server.close(async (err) => {
      if (err) {
        logger.error({ err }, 'Error closing HTTP server');
        process.exit(1);
      }
      await closeDb();
      logger.info('Shutdown complete.');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Forcing shutdown after 10s timeout');
      process.exit(1);
    }, 10_000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (reason) => {
    logger.error({ reason }, 'Unhandled promise rejection');
  });
  process.on('uncaughtException', (err) => {
    logger.error({ err }, 'Uncaught exception');
    process.exit(1);
  });
}

bootstrap().catch((err) => {
  logger.error({ err }, 'Failed to bootstrap server');
  process.exit(1);
});
