import { Sequelize } from 'sequelize';

// function buildDialectOptions() {
//   if (process.env.DB_SSL === 'false') {
//     return {};
//   }
//   const host = process.env.DB_HOST || '';
//   const wantSsl =
//     process.env.DB_SSL === 'true' ||
//     host.includes('supabase') ||
//     host.includes('neon.tech');
//   if (!wantSsl) {
//     return {};
//   }
//   return {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   };
// }

// Database configuration
const databaseConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  // dialectOptions: buildDialectOptions(),
}

// Create connection
const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: 'mysql',
  logging: false
})

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

export default sequelize;