import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { loginUser } from './loginService';

// Validaciones para login
export const loginValidation = [
  body('email').isEmail().withMessage({ code: 'EMAIL_INVALID' }),
  body('password').notEmpty().withMessage({ code: 'PASSWORD_REQUIRED' }),
];

// Controlador de login
export const loginController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ code: "VALIDATION_ERROR", errors: errors.array() });
  }

  try {
    const token = await loginUser(req.body);
    res.status(200).json({ code: "LOGIN_SUCCESSFUL", token });
  } catch (error: any) {
    if (error.code) {
      return res.status(400).json({ code: error.code });
    }
    return res.status(400).json({ code: "LOGIN_ERROR" });
  }
};