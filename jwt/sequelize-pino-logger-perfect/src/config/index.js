function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env: ${name}. Check your .env file and restart.`);
  }
  return value;
}

function optional(name, defaultValue) {
  const value = process.env[name];
  return value === undefined || value === '' ? defaultValue : value;
}

function toInt(name, defaultValue) {
  const raw = optional(name, defaultValue);
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Env ${name} must be a number, got: ${raw}`);
  }
  return parsed;
}

const config = {
  env: optional('NODE_ENV', 'development'),
  port: toInt('PORT', 3000),
  apiPrefix: optional('API_PREFIX', '/api'),

  db: {
    host: required('DB_HOST'),
    port: toInt('DB_PORT', 3306),
    username: required('DB_USER'),
    password: required('DB_PASSWORD'),
    database: required('DB_NAME'),
    dialect: optional('DB_DIALECT', 'mysql'),
  },

  jwt: {
    secret: required('JWT_SECRET'),
    expiresIn: optional('JWT_EXPIRES_IN', '7d'),
  },

  bcrypt: {
    saltRounds: toInt('BCRYPT_SALT_ROUNDS', 10),
  },

  rateLimit: {
    windowMs: toInt('RATE_LIMIT_WINDOW_MS', 60_000),
    max: toInt('RATE_LIMIT_MAX', 60),
  },
};

export default config;
