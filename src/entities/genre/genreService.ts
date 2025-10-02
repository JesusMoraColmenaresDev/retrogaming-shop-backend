import { Genre } from './genreModel';
import { GenreAttributes } from './genreTypes';
import { ApiError } from '../../utils/ApiError';

export const createGenre = async (data: GenreAttributes) => {
	const existing = await Genre.findOne({ where: { name: data.name } });
	if (existing) {
		throw new ApiError('GENRE_ALREADY_EXISTS');
	}
	return Genre.create(data);
};

