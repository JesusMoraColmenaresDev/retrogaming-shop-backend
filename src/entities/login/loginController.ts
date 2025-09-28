import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { loginUser } from './loginService';

// Validaciones para login
export const loginValidation = [
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

// Controlador de login
export const loginController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Correo o contraseña inválido.' });
  }
};