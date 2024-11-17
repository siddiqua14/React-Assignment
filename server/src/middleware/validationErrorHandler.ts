import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationErrorHandler = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If errors exist, send the response
    res.status(400).json({ errors: errors.array() });
  } else {
    // If no errors, move on to the next
    next();
  }
};
