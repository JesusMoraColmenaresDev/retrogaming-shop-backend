import { Request, Response } from 'express';
import { createGenre, getAllGenres } from './genreService';
import { ApiError } from '../../utils/ApiError';

export const createGenreController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ code: 'GENRE_NAME_REQUIRED' });
    }
    const genre = await createGenre({ name });
    res.status(201).json(genre);
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(409).json({ code: err.code });
    }
    res.status(500).json({ code: 'GENRE_CREATE_ERROR' });
  }
};

export const getAllGenresController = async (req: Request, res: Response) => {
  try {
    const genres = await getAllGenres();
    console.log(genres);
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json({ code: 'GENRE_FETCH_ERROR' });
  }
};
