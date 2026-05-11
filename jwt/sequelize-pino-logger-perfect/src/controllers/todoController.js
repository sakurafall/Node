import AppError from '../utils/AppError.js';
import { sendSuccessResponse } from '../utils/responseHelper.js';
import {
  getAllTodos,
  countTodo,
  getTodoById as getTodoByIdApi,
  deleteTodoById as deleteTodoByIdApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
} from '../services/todoService.js';

export async function getTodos(req, res) {
  const { page, limit, search } = req.query;
  const todos = await getAllTodos({ userId: req.user.id, page, limit, search });
  return sendSuccessResponse(res, todos);
}

export async function getCount(req, res) {
  const { search } = req.query;
  const total = await countTodo({ userId: req.user.id, search });
  return sendSuccessResponse(res, total);
}

export async function getTodoById(req, res) {
  const { todoId } = req.params;
  const todo = await getTodoByIdApi({ userId: req.user.id, todoId });
  if (!todo) {
    throw new AppError(`Todo with id ${todoId} not found`, 404, 'NotFound');
  }
  return sendSuccessResponse(res, todo);
}

export async function deleteTodoById(req, res) {
  const { todoId } = req.params;
  const deleted = await deleteTodoByIdApi({ userId: req.user.id, todoId });
  if (!deleted) {
    throw new AppError(`Todo with id ${todoId} not found`, 404, 'NotFound');
  }
  return sendSuccessResponse(res, deleted, 'Todo deleted successfully');
}

export async function createTodo(req, res) {
  const created = await createTodoApi({ userId: req.user.id, todo: req.body });
  return sendSuccessResponse(res, created, 'Todo created successfully');
}

export async function updateTodo(req, res) {
  const affected = await updateTodoApi({ userId: req.user.id, todo: req.body });
  if (!affected) {
    throw new AppError(`Todo with id ${req.body.id} not found`, 404, 'NotFound');
  }
  return sendSuccessResponse(res, req.body, 'Todo updated successfully');
}
