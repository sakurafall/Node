import { Sequelize } from 'sequelize';
import config from '../config/index.js';
import { logger } from './loggerHelper.js';

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: config.env === 'development' ? (msg) => logger.debug(msg) : false,
  }
);

export async function connectDb() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');
  } catch (error) {
    logger.error({ err: error }, 'Unable to connect to the database');
    throw error;
  }
}

export async function closeDb() {
  try {
    await sequelize.close();
    logger.info('Database connection closed.');
  } catch (error) {
    logger.error({ err: error }, 'Failed to close database connection');
  }
}

export default sequelize;
