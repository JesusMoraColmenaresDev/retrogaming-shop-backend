import { Platform } from './platformModel';
import { PlatformAttributes } from './platformTypes';

export const createPlatform = async (data: PlatformAttributes) => {
	return Platform.create(data);
};

