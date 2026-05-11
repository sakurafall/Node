import { Op } from 'sequelize';
import sequelize from '../utils/dbHelper.js';
import { Todo } from '../models/index.js';

function buildSearchWhere(userId, search) {
  const where = { userId };
  if (search) {
    where[Op.and] = sequelize.where(
      sequelize.fn('lower', sequelize.col('title')),
      { [Op.like]: `%${search.toLowerCase()}%` }
    );
  }
  return where;
}

export async function getAllTodos({ userId, page = 1, limit = 10, search = '' }) {
  const offset = (page - 1) * limit;
  return Todo.findAll({
    where: buildSearchWhere(userId, search),
    offset,
    limit,
    order: [['id', 'DESC']],
  });
}

export async function countTodo({ userId, search = '' }) {
  return Todo.count({ where: buildSearchWhere(userId, search) });
}

export async function getTodoById({ userId, todoId }) {
  return Todo.findOne({ where: { id: todoId, userId } });
}

export async function deleteTodoById({ userId, todoId }) {
  return Todo.destroy({ where: { id: todoId, userId } });
}

export async function createTodo({ userId, todo }) {
  return Todo.create({ ...todo, userId });
}

export async function updateTodo({ userId, todo }) {
  const { id, ...rest } = todo;
  const [affected] = await Todo.update(rest, { where: { id, userId } });
  return affected;
}
