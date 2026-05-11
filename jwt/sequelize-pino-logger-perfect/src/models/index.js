import sequelize from '../utils/dbHelper.js';
import User from './userModel.js';
import Todo from './todoModel.js';

User.hasMany(Todo, { foreignKey: 'userId', onDelete: 'CASCADE' });
Todo.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Todo };
