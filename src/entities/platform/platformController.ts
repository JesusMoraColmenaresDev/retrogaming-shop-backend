import { Request, Response } from 'express';
import { createPlatform } from './platformService';
import { ApiError } from '../../utils/ApiError';

export const createPlatformController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ code: 'PLATFORM_NAME_REQUIRED' });
    }
    const platform = await createPlatform({ name });
    res.status(201).json(platform);
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(409).json({ code: err.code });
    }
    res.status(500).json({ code: 'PLATFORM_CREATE_ERROR' });
  }
};

