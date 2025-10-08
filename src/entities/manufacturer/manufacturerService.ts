import { Manufacturer } from './manufacturerModel';
import { ManufacturerAttributes } from './manufacturerTypes';
import { ApiError } from '../../utils/ApiError';

export const createManufacturer = async (data: ManufacturerAttributes) => {
	const existing = await Manufacturer.findOne({ where: { name: data.name } });
	if (existing) {
		throw new ApiError('MANUFACTURER_ALREADY_EXISTS');
	}
	return Manufacturer.create(data);
};

export const getAllManufacturers = async () => {
	return Manufacturer.findAll();
}

