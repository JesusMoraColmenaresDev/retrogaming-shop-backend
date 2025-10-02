import { Platform } from './platformModel';
import { PlatformAttributes } from './platformTypes';
import { ApiError } from '../../utils/ApiError';

export const createPlatform = async (data: PlatformAttributes) => {
	const existing = await Platform.findOne({ where: { name: data.name } });
	if (existing) {
		throw new ApiError('PLATFORM_ALREADY_EXISTS');
	}
	return Platform.create(data);
};

