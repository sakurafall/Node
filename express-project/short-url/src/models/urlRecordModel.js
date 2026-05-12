import { DataTypes } from 'sequelize';
import sequelize from '../utils/dbHelper.js';

const URLRecord = sequelize.define(
  'URLRecord',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    originURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    tableName: 'url_record',
  },
);

export default URLRecord;