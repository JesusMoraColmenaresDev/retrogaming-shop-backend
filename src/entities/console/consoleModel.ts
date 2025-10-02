import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';
import { ConsoleAttributes } from './consoleTypes';
import { Manufacturer } from '../manufacturer/manufacturerModel';

export type ConsoleInstance = Model<ConsoleAttributes>;
export const Console = sequelize.define<ConsoleInstance>('Console', {
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
  manufacturerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Manufacturers',
      key: 'id',
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
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
});

// Asociaciones ORM
Console.belongsTo(Manufacturer, { foreignKey: 'manufacturerId', as: 'manufacturer' });
Manufacturer.hasMany(Console, { foreignKey: 'manufacturerId', as: 'consoles' });
