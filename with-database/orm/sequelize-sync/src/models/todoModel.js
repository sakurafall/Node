import { DataTypes } from 'sequelize';
import sequelize from '../utils/dbHelper.js';

// Define model
const Todo = sequelize.define(
  'Todo',
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    tag: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'todo',
    createdAt: false,
    updatedAt: false,
  }
);

export default Todo;