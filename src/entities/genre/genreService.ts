import { Genre } from './genreModel';
import { GenreAttributes } from './genreTypes';

export const createGenre = async (data: GenreAttributes) => {
	return Genre.create(data);
};

