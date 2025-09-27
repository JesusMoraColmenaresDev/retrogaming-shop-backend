import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { User } from './entities/userModel';
import { sequelize } from './database';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hola desde el backend!' });
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
});