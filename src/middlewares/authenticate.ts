import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserJwtPayload } from '../entities/user/userTypes';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ code: 'AUTH_REQUIRED' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey') as UserJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ code: 'INVALID_TOKEN' });
  }
}