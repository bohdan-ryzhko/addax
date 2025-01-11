import { NextFunction, Request, Response } from 'express';

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const ctrlWrapper =
  (ctrl: ControllerFunction) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
