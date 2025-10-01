//creame la estructura basica de los controladores de game, sin logica, solo la estructura
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { createGame, getAllGames, getGameById, updateGame, deleteGame } from './gameService';
import { Platform } from '../platform/platformModel';
import { Genre } from '../genre/genreModel';


// Validaciones para creación y actualización de juegos
export const gameValidation = [
  body('name').notEmpty().withMessage({ code: 'NAME_REQUIRED' }),
  body('description').notEmpty().withMessage({ code: 'DESCRIPTION_REQUIRED' }),
  body('releaseDate').isISO8601().toDate().withMessage({ code: 'INVALID_DATE' }),
  body('platformId').isInt().withMessage({ code: 'PLATFORM_ID_REQUIRED' }),
  body('genreId').isInt().withMessage({ code: 'GENRE_ID_REQUIRED' }),
  body('stock').isInt({ min: 0 }).withMessage({ code: 'STOCK_REQUIRED' }),
  body('price').isFloat({ min: 0 }).withMessage({ code: 'PRICE_REQUIRED' }),
  body('imageUrl1').optional().isString().withMessage({ code: 'IMAGE_URL_INVALID' }),
  body('imageUrl2').optional().isString().withMessage({ code: 'IMAGE_URL_INVALID' }),
  body('imageUrl3').optional().isString().withMessage({ code: 'IMAGE_URL_INVALID' }),
];

export const createGameController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const gameData = req.body;

  // Validar que platformId existe
  const platform = await Platform.findByPk(gameData.platformId);
  if (!platform) {
    return res.status(400).json({ code: 'PLATFORM_NOT_FOUND'});
  }

  // Validar que genreId existe
  const genre = await Genre.findByPk(gameData.genreId);
  if (!genre) {
    return res.status(400).json({ code: 'GENRE_NOT_FOUND'});
  }

  const newGame = await createGame(gameData);
  res.status(201).json(newGame);
};

export const getAllGamesController = async (req: Request, res: Response) => {
  const games = await getAllGames();
  res.status(200).json(games);
};

export const getGameByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const game = await getGameById(Number(id));
  if (!game) {
    return res.status(404).json({ code: 'GAME_NOT_FOUND' });
  }
  res.status(200).json(game);
};

export const updateGameController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const gameData = req.body;
  const updatedGame = await updateGame(Number(id), gameData);
  if (!updatedGame) {
    return res.status(404).json({ code: 'GAME_NOT_FOUND' });
  }
  res.status(200).json(updatedGame);
};

export const deleteGameController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedGame = await deleteGame(Number(id));
  if (!deletedGame) {
    return res.status(404).json({ code: 'GAME_NOT_FOUND' });
  }
  res.status(204).send();
};
