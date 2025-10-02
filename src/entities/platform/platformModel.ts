import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';
import { PlatformAttributes } from './platformTypes';

export type PlatformInstance = Model<PlatformAttributes>;
export const Platform = sequelize.define<PlatformInstance>('Platform', {
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
