import { Request, Response } from 'express';
import { UserJwtPayload } from './userTypes';

export const getCurrentUserController = (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ code: 'AUTH_REQUIRED' });
    }
    //el iat y el exp son campos añadidos por JWT que indican cuándo se emitió el token y cuándo expira. No son necesarios para el cliente., asi que los excluimos
    const { iat, exp, ...userData } = req.user;
    res.json({ user: userData });
};
