import { Request, Response } from 'express';
import { createManufacturer } from './manufacturerService';
import { ApiError } from '../../utils/ApiError';

export const createManufacturerController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ code: 'MANUFACTURER_NAME_REQUIRED' });
    }
    const manufacturer = await createManufacturer({ name });
    res.status(201).json(manufacturer);
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(409).json({ code: err.code });
    }
    res.status(500).json({ code: 'MANUFACTURER_CREATE_ERROR' });
  }
};

