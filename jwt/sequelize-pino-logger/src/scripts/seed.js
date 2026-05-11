import { readFile } from 'node:fs/promises';
import sequelize from '../utils/dbHelper.js';
import Todo from '../models/todoModel.js';
import User from '../models/userModel.js';

try {

  // Read initialize data
  const initializeTodosString = await readFile(
    './src/scripts/data/initData.js',
    'utf-8'
  );

  // Parse initialize data
  const initializeTodos = JSON.parse(initializeTodosString);

  // Test connection
  await sequelize.authenticate();

  // Sync database
  await Todo.sync({ force: true });
  await User.sync({ force: true });

  // Insert data
  const todos = await Todo.bulkCreate(initializeTodos);
  console.log(JSON.stringify(todos, null, 2));

} catch (error) {
  console.log(error.message);
} finally {
  sequelize.close();
}