import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { User } from './entities/user/userModel';
import { sequelize } from './database';
import { registerController, registerValidation } from './entities/register/registerController';
import { loginController, loginValidation } from './entities/login/loginController';
import { authenticateJWT } from './middlewares/authenticate';

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

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
});