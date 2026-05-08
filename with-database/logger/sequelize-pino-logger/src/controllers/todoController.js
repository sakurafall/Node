import {
  getAllTodos,
  getTodoById as getTodoByIdApi,
  deleteTodoById as deleteTodoByIdApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  countTodo as countTodoApi
} from "../services/todoService.js";
import { logger } from "../utils/loggerHelper.js";

export async function getTodos(req, res) {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const search = req.query.search
  const offset = (page - 1) * limit

  // logger.info(`Fetching todos with page: ${page}, limit: ${limit}, search: ${search}`);

  const todos = await getAllTodos(offset, limit, search);

  // logger.info(`Fetched todos: ${JSON.stringify(todos, null, 2)}`);

  res.status(200).json(todos);
}

export async function getCount(req, res) {
  const search = req.query.search

  const todoCount = await countTodoApi(search)

  res.status(200).json({
    count: todoCount
  })
}  

export async function getTodoById(req, res) {
  const todoId = req.params.todoId

  if (!todoId) {
    return res.status(400).send("Todo ID is required");
  }

  const todo = await getTodoByIdApi(todoId);

  res.status(200).json(todo);
}

export async function deleteTodoById(req, res) {
  const todoId = req.params.todoId;
  if (!todoId) {
    return res.status(400).send("Todo ID is required");
  }

  await deleteTodoByIdApi(todoId);

  return res.status(200).json({
    message: "Todo deleted successfully",
  });
}

export async function createTodo(req, res) {
  const addTodo = req.body;

  if (!addTodo) {
    return res.status(400).send("Bad request");
  }

  const addedTodo = await createTodoApi(addTodo);

  return res.status(200).json({
    message: "Todo added successfully",
    data: addedTodo,
  });
}

export async function updateTodo(req, res) {
  const updateTodo = req.body;

  if (!updateTodo) {
    return res.status(400).send("Bad request");
  }

  await updateTodoApi(updateTodo);

  return res.status(200).json({
    message: "Todo update successfully",
    data: updateTodo
  });
}
