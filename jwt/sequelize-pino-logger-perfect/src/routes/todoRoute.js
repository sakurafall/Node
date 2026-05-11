import express from 'express';
import {
  getTodos,
  getCount,
  getTodoById,
  deleteTodoById,
  createTodo,
  updateTodo,
} from '../controllers/todoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import {
  createTodoBodySchema,
  updateTodoBodySchema,
  todoIdParamsSchema,
  listTodoQuerySchema,
  countTodoQuerySchema,
} from '../schemas/todoSchema.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/count', validate({ query: countTodoQuerySchema }), getCount);

router
  .route('/')
  .get(validate({ query: listTodoQuerySchema }), getTodos)
  .post(validate({ body: createTodoBodySchema }), createTodo)
  .patch(validate({ body: updateTodoBodySchema }), updateTodo);

router
  .route('/:todoId')
  .get(validate({ params: todoIdParamsSchema }), getTodoById)
  .delete(validate({ params: todoIdParamsSchema }), deleteTodoById);

export default router;
