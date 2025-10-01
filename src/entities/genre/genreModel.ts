import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';
import { GenreAttributes } from './genreTypes';

export type GenreInstance = Model<GenreAttributes>;
export const Genre = sequelize.define<GenreInstance>('Genre', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
