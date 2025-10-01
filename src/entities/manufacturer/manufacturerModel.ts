import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';
import { ManufacturerAttributes } from './manufacturerTypes';

export type ManufacturerInstance = Model<ManufacturerAttributes>;
export const Manufacturer = sequelize.define<ManufacturerInstance>('Manufacturer', {
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
