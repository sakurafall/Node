import { DataTypes } from 'sequelize';
import sequelize from '../utils/dbHelper.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
  },
  {
    tableName: 'tb_user',
    createdAt: false,
    updatedAt: false,
  }
);

export default User;
