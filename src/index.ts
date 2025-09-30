import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './database';
import { registerController, registerValidation } from './entities/register/registerController';
import { loginController, loginValidation } from './entities/login/loginController';
import { authenticateJWT } from './middlewares/authenticate';
import { getCurrentUserController } from './entities/user/userController';

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

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
});