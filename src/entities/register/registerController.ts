import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { registerUser } from './registerService';

// Validaciones con express-validator
export const registerValidation = [
    body('firstName').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Correo electrónico inválido'),
    body('phoneNumber').notEmpty().withMessage('El número de teléfono es obligatorio'),
    body('country').notEmpty().withMessage('El país es obligatorio'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
];

// Controlador de registro
export const registerController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await registerUser(req.body);
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Error al registrar el usuario.' });
    }
};