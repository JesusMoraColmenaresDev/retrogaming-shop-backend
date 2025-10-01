import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';
import { GameAttributes } from './gameTypes';
import { Platform } from '../platform/platformModel';
import { Genre } from '../genre/genreModel';



export type GameInstance = Model<GameAttributes>;

export const Game = sequelize.define<GameInstance>('Game', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  platformId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Platforms',
      key: 'id',
    },
  },
  genreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Genres',
      key: 'id',
    },
  },
  imageUrl1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Game.belongsTo(Platform, { foreignKey: 'platformId', as: 'platform' });
Game.belongsTo(Genre, { foreignKey: 'genreId', as: 'genre' });
