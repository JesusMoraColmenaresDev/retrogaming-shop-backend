import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { registerUser } from './registerService';

// Validaciones con express-validator
export const registerValidation = [
    body('firstName').notEmpty().withMessage({ code: 'FIRST_NAME_REQUIRED' }),
    body('lastName').notEmpty().withMessage({ code: 'LAST_NAME_REQUIRED' }),
    body('email').isEmail().withMessage({ code: 'EMAIL_INVALID' }),
    body('phoneNumber').notEmpty().withMessage({ code: 'PHONE_NUMBER_REQUIRED' }),
    body('country').notEmpty().withMessage({ code: 'COUNTRY_REQUIRED' }),
    body('password').isLength({ min: 8 }).withMessage({ code: 'PASSWORD_TOO_SHORT' }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw { code: 'PASSWORDS_DO_NOT_MATCH' };
        }
        return true;
    }),
];

// Controlador de registro
export const registerController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ code: "VALIDATION_ERROR", errors: errors.array() });
    }

    try {
        await registerUser(req.body);
        res.status(201).json({ code: "USER_REGISTERED_SUCCESSFULLY" });
    } catch (error: any) {
        if (error.code) {
            return res.status(400).json({ code: error.code });
        }
        return res.status(400).json({ code: "REGISTRATION_ERROR" });
    }
};