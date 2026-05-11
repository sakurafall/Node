import { readFile } from 'node:fs/promises';
import bcrypt from 'bcrypt';
import config from '../config/index.js';
import { connectDb, closeDb } from '../utils/dbHelper.js';
import { sequelize, User, Todo } from '../models/index.js';
import { logger } from '../utils/loggerHelper.js';

async function seed() {
  await connectDb();

  // Drop in dependency order then sync (FK aware)
  await sequelize.drop();
  await User.sync();
  await Todo.sync();

  const defaultUser = await User.create({
    email: 'demo@example.com',
    password: await bcrypt.hash('demo12345', config.bcrypt.saltRounds),
  });

  const initData = JSON.parse(
    await readFile('./src/scripts/data/initData.js', 'utf-8')
  );

  const todosWithOwner = initData.map(({ id: _ignore, ...rest }) => ({
    ...rest,
    userId: defaultUser.id,
  }));

  const todos = await Todo.bulkCreate(todosWithOwner);
  logger.info(`Seeded ${todos.length} todos for user ${defaultUser.email}`);
}

seed()
  .catch((err) => {
    logger.error({ err }, 'Seed failed');
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDb();
  });
