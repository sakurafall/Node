import {
  getAllTodos,
  getTodoById as getTodoByIdApi,
  deleteTodoById as deleteTodoByIdApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  countTodo as countTodoApi
} from "../services/todoService.js";
import { logger } from "../utils/loggerHelper.js";
import AppError from "../utils/AppError.js";
import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHelper.js";

export async function getTodos(req, res) {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const search = req.query.search
  const offset = (page - 1) * limit

  // logger.info(`Fetching todos with page: ${page}, limit: ${limit}, search: ${search}`);

  // logger.info(`Fetched todos: ${JSON.stringify(todos, null, 2)}`);

  try {
    const todos = await getAllTodos(offset, limit, search);
    return sendSuccessResponse(res, todos);
  } catch (error) {
    throw new AppError(`Failed to fetch todos`, 500, error.name);
  }
}

export async function getCount(req, res) {
  const search = req.query.search

  try {
    const todoCount = await countTodoApi(search)
    return sendSuccessResponse(res, todoCount);
  } catch (error) {
    throw new AppError(`Failed to fetch todo count`, 500, error.name);
  }
}  

export async function getTodoById(req, res) {
  const todoId = req.params.todoId

  // if the todoId is missing, the request will be process by getTodos

  try {
    const todo = await getTodoByIdApi(todoId);

    return sendSuccessResponse(res, todo);
  } catch (error) {
    throw new AppError(`Todo with id ${todoId} not found`, 404, error.name);
  }
}

export async function deleteTodoById(req, res) {
  const todoId = req.params.todoId;

  if (!todoId) {
    return sendErrorResponse(res, 'Todo ID is required');
  }

  try {
    const deletedTodoNumber = await deleteTodoByIdApi(todoId);

    if (!deletedTodoNumber) {
      return sendErrorResponse(res)
    }

    return sendSuccessResponse(res, deletedTodoNumber, 'Todo deleted successfully');
  } catch (error) {
    throw new AppError(`Failed to delete todo with id ${todoId}`, 400, error.name);
  }
}

export async function createTodo(req, res) {
  const addTodo = req.body;

  if (!addTodo) {
    return sendErrorResponse(res, 'The todo is required');
  }

  try {
    const addedTodo = await createTodoApi(addTodo);
    return sendSuccessResponse(res, addedTodo);
  } catch (error) {
    throw new AppError(`This id ${addTodo.id} already exists`, 400, error.name);
  }
}

export async function updateTodo(req, res) {
  const updateTodo = req.body;

  if (!updateTodo) {
    return sendErrorResponse(res, 'The todo is required');
  }

  try {
    const updatedTodoNumber = await updateTodoApi(updateTodo);

    if (!updatedTodoNumber) {
      return sendErrorResponse(res, `Failed to update todo with id ${updateTodo.id}`);
    }

    return sendSuccessResponse(res, updateTodo);
  } catch (error) {
    throw new AppError(`This id ${updateTodo.id} not found`, 404, error.name);
  }
}
