//ahora creame la base del servicio de game, sin logica, solo la estructura
import { Genre } from '../genre/genreModel';
import { Platform } from '../platform/platformModel';
import { Game } from './gameModel';
import { GameAttributes } from './gameTypes';

export const createGame = async (gameData: GameAttributes) => {
    await Game.create(gameData);
    return gameData;
};

export const getAllGames = async () => {
    return Game.findAll({
        attributes: { exclude: ['platformId', 'genreId'] },
        include: [
            { model: Platform, as: 'platform' },
            { model: Genre, as: 'genre' }
        ]
    });
};

export const getGameById = async (id: number) => {
    return Game.findByPk(id);
};

export const updateGame = async (id: number, gameData: GameAttributes) => {
    return Game.update(gameData, { where: { id } });
};

export const deleteGame = async (id: number) => {
    return Game.destroy({ where: { id } });
};
