import { Request, Response } from 'express';
import { createGenre } from './genreService';

export const createGenreController = async (req: Request, res: Response) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ code: 'GENRE_NAME_REQUIRED' });
	}
	try {
		const genre = await createGenre({ name });
		res.status(201).json(genre);
	} catch (err: any) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(409).json({ code: 'GENRE_ALREADY_EXISTS' });
		}
		res.status(500).json({ code: 'GENRE_CREATE_ERROR' });
	}
};

