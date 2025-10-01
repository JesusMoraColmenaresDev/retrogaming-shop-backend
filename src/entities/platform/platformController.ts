import { Request, Response } from 'express';
import { createPlatform } from './platformService';

export const createPlatformController = async (req: Request, res: Response) => {
	const { name, imageUrl1, imageUrl2, imageUrl3 } = req.body;
	if (!name) {
		return res.status(400).json({ code: 'PLATFORM_NAME_REQUIRED' });
	}
	try {
		const platform = await createPlatform({ name, imageUrl1, imageUrl2, imageUrl3 });
		res.status(201).json(platform);
	} catch (err: any) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(409).json({ code: 'PLATFORM_ALREADY_EXISTS' });
		}
		res.status(500).json({ code: 'PLATFORM_CREATE_ERROR' });
	}
};

