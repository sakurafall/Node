import express from 'express'
import { getTodos, getCount, getTodoById, deleteTodoById, createTodo, updateTodo } from '../controllers/todoController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

router.route('/todos/count').get(getCount)
router.route('/todos').get(getTodos).post(createTodo).patch(updateTodo)
router.route('/todos/:todoId').get(getTodoById).delete(deleteTodoById)

export default router