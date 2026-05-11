import { DataTypes } from 'sequelize';
import sequelize from '../utils/dbHelper.js';

const Todo = sequelize.define(
  'Todo',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(255),
    },
    tag: {
      type: DataTypes.STRING(255),
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'tb_user',
        key: 'id',
      },
    },
  },
  {
    tableName: 'todo',
    createdAt: false,
    updatedAt: false,
    indexes: [{ fields: ['userId'] }],
  }
);

export default Todo;
