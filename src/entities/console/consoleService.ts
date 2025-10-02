import { Console } from './consoleModel';
import { ConsoleAttributes } from './consoleTypes';
import { Manufacturer } from '../manufacturer/manufacturerModel';
import { ApiError } from '../../utils/ApiError';

export const createConsole = async (data: ConsoleAttributes) => {
  // Validar que manufacturerId existe
  const manufacturer = await Manufacturer.findByPk(data.manufacturerId);
  if (!manufacturer) {
    throw new ApiError('MANUFACTURER_NOT_FOUND');
  }
  return Console.create(data);
};


export const getAllConsoles = async (limit: number, offset: number) => {
  const { count, rows } = await Console.findAndCountAll({
    attributes: { exclude: ['manufacturerId'] },
    include: [
      { model: Manufacturer, as: 'manufacturer' }
    ],
    limit,
    offset,
  });

  return { consoles: rows, total: count };
};

export const getConsoleById = async (id: number) => {
  return Console.findByPk(id);
};

export const updateConsole = async (id: number, data: ConsoleAttributes) => {
  return Console.update(data, { where: { id } });
};

export const deleteConsole = async (id: number) => {
  return Console.destroy({ where: { id } });
};
