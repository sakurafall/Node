import express from "express";
import {
  getTodos,
  getTodoById,
  deleteTodoById,
  createTodo,
  updateTodo,
} from "../controllers/todoController.js";

const router = express.Router();

// base route for todos
// router.get('/todos', getTodos);
// router.get('/todos/:todoId', getTodoById);
// router.delete('/todos/:todoId', deleteTodoById);
// router.post('/todos', createTodo);
// router.patch('/todos', updateTodo);

// route for todos
router.route('/todos').get(getTodos).post(createTodo).patch(updateTodo);
router.route('/todos/:todoId').get(getTodoById).delete(deleteTodoById);

export default router;
