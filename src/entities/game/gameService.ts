//ahora creame la base del servicio de game, sin logica, solo la estructura
import { Genre } from '../genre/genreModel';
import { Platform } from '../platform/platformModel';
import { Game } from './gameModel';
import { GameAttributes } from './gameTypes';
import { ApiError } from '../../utils/ApiError';

export const createGame = async (gameData: GameAttributes) => {
    // Validar que platformId existe
    const platform = await Platform.findByPk(gameData.platformId);
    if (!platform) {
        throw new ApiError('PLATFORM_NOT_FOUND');
    }

    // Validar que genreId existe
    const genre = await Genre.findByPk(gameData.genreId);
    if (!genre) {
        throw new ApiError('GENRE_NOT_FOUND');
    }

    return Game.create(gameData);
};

export const getAllGames = async (limit: number, offset: number) => {
    const { count, rows } = await Game.findAndCountAll({
        attributes: { exclude: ['platformId', 'genreId'] },
        include: [
            { model: Platform, as: 'platform' },
            { model: Genre, as: 'genre' }
        ],
        limit,
        offset,
    });
    return { games: rows, total: count };
};

export const getGameById = async (id: number) => {
    //incluye a platform y genre
    return Game.findByPk(id, {
        include: [
            { model: Platform, as: 'platform' },
            { model: Genre, as: 'genre' }
        ]
    });
};

export const updateGame = async (id: number, gameData: GameAttributes) => {
    return Game.update(gameData, { where: { id } });
};

export const deleteGame = async (id: number) => {
    return Game.destroy({ where: { id } });
};
