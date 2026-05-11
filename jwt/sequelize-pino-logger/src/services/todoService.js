import Todo from "../models/todoModel.js";
import { Op } from "sequelize";
import sequelize from "../utils/dbHelper.js";

// Implement all the service functions via sequelize model(Todo)
export async function getAllTodos(offset, limit = 5, search) {
  let titleFilter = {}

  if (search) {
    titleFilter = {
      // where: {
      //   title: {
      //     [Op.like]: `%${search}%`
      //   }
      // }

      where: sequelize.where(sequelize.fn('lower', sequelize.col('title')), {
        [Op.like]: `%${search.toLowerCase()}%`
      })
    }
  }
  const todos = await Todo.findAll({
    offset,
    limit,
    ...titleFilter
  })

  return todos
}

export async function countTodo(search) {
  let titleFilter = {}

  if (search) {
    titleFilter = {
      where: sequelize.where(sequelize.fn('lower', sequelize.col('title')), {
        [Op.like]: `%${search.toLowerCase()}%`
      })
    }
  }

  return Todo.count(titleFilter)
}

export async function getTodoById(todoId) {
  const todo = await Todo.findOne({ where: { id: todoId }});
  
  return todo
}

export async function deleteTodoById(todoId) {
  const deletedTodoNumber = await Todo.destroy({ where: { id: todoId }})

  return deletedTodoNumber
}

export async function createTodo(addTodo) {
  const addedTodo = await Todo.create(addTodo)

  return addedTodo
}

export async function updateTodo(updateTodo) {
  const updatedTodoEffect = await Todo.update(
    updateTodo,
    {
      where: {
        id: updateTodo.id
      }
    }
  )

  return updatedTodoEffect[0]
}