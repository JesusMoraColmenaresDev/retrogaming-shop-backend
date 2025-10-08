import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { createConsole, getAllConsoles, getConsoleById, updateConsole, deleteConsole } from './consoleService';
import { ApiError } from '../../utils/ApiError';

export const consoleValidation = [
  body('name').notEmpty().withMessage({ code: 'NAME_REQUIRED' }),
  body('description').notEmpty().withMessage({ code: 'DESCRIPTION_REQUIRED' }),
  body('releaseDate').isISO8601().toDate().withMessage({ code: 'INVALID_DATE' }),
  body('manufacturerId').isInt().withMessage({ code: 'MANUFACTURER_ID_REQUIRED' }),
  body('stock').isInt({ min: 0 }).withMessage({ code: 'STOCK_REQUIRED' }),
  body('price').isFloat({ min: 0 }).withMessage({ code: 'PRICE_REQUIRED' }),
  body('imageUrl1').optional().isString().withMessage({ code: 'IMAGE_URL_INVALID' }),
  body('imageUrl2').optional().isString().withMessage({ code: 'IMAGE_URL_INVALID' }),
  body('imageUrl3').optional().isString().withMessage({ code: 'IMAGE_URL_INVALID' }),
];

export const createConsoleController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newConsole = await createConsole(req.body);
    res.status(201).json(newConsole);
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(400).json({ code: err.code });
    }
    res.status(500).json({ code: 'CONSOLE_CREATE_ERROR' });
  }
};

export const getAllConsolesController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 4;
  const offset = (page - 1) * limit;
  const manufacturerId = req.query.manufacturer 

  try {
    const { consoles, total } = await getAllConsoles(limit, offset, Number(manufacturerId));
    const totalPages = Math.ceil(total / limit);
    res.status(200).json({ consoles, total, totalPages, page });
  } catch (err) {
    res.status(500).json({ code: 'CONSOLE_LIST_ERROR' });
  }
};

export const getConsoleByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const consoleItem = await getConsoleById(Number(id));
    if (!consoleItem) {
      return res.status(404).json({ code: 'CONSOLE_NOT_FOUND' });
    }
    res.status(200).json(consoleItem);
  } catch (err) {
    res.status(500).json({ code: 'CONSOLE_GET_ERROR' });
  }
};

export const updateConsoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await updateConsole(Number(id), req.body);
    if (!updated) {
      return res.status(404).json({ code: 'CONSOLE_NOT_FOUND' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ code: 'CONSOLE_UPDATE_ERROR' });
  }
};

export const deleteConsoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteConsole(Number(id));
    if (!deleted) {
      return res.status(404).json({ code: 'CONSOLE_NOT_FOUND' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ code: 'CONSOLE_DELETE_ERROR' });
  }
};
