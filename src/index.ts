import { createManufacturerController, getAllManufacturersController } from './entities/manufacturer/manufacturerController';
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './database';
import { registerController, registerValidation } from './entities/register/registerController';
import { loginController, loginValidation } from './entities/login/loginController';
import { authenticateJWT } from './middlewares/authenticate';
import { getCurrentUserController } from './entities/user/userController';
import { createGameController, deleteGameController, gameValidation, getAllGamesController, getGameByIdController, updateGameController } from './entities/game/gameController';
import { createGenreController, getAllGenresController } from './entities/genre/genreController';
import { createPlatformController, getAllPlatformsController } from './entities/platform/platformController';
import { createConsoleController, getAllConsolesController, getConsoleByIdController, updateConsoleController, deleteConsoleController, consoleValidation } from './entities/console/consoleController';
import './entities/platform/platformModel';
import './entities/genre/genreModel';
import './entities/manufacturer/manufacturerModel';
import './entities/game/gameModel';
import './entities/user/userModel';
import './entities/console/consoleModel';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', authenticateJWT, (req: Request, res: Response) => {
  res.json({ message: 'Hola desde el backend!' });
});

app.post('/register', registerValidation, registerController);
app.post('/login', loginValidation, loginController);

app.get('/me', authenticateJWT, getCurrentUserController);

app.post('/games', authenticateJWT, gameValidation, createGameController);
app.post('/manufacturers', authenticateJWT, createManufacturerController);
app.get('/games', authenticateJWT, getAllGamesController);
app.get('/games/:id', authenticateJWT, getGameByIdController);
app.patch('/games/:id', authenticateJWT, updateGameController);
app.delete('/games/:id', authenticateJWT, deleteGameController);
app.post('/genres', authenticateJWT, createGenreController);
app.post('/platforms', authenticateJWT, createPlatformController);
app.post('/consoles', authenticateJWT, consoleValidation, createConsoleController);
app.get('/consoles', authenticateJWT, getAllConsolesController);
app.get('/consoles/:id', authenticateJWT, getConsoleByIdController);
app.patch('/consoles/:id', authenticateJWT, consoleValidation, updateConsoleController);
app.delete('/consoles/:id', authenticateJWT, deleteConsoleController);
app.get('/platforms', authenticateJWT, getAllPlatformsController);
app.get('/genres', authenticateJWT, getAllGenresController);
app.get('/manufacturers', authenticateJWT, getAllManufacturersController);


(async () => {
  //await sequelize.drop();
  //await sequelize.sync({ alter: true });
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
})();