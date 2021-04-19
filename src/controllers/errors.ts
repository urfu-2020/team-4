import { Request, Response } from 'express';

export const error404 = (req: Request, res: Response): void => {
    res.sendStatus(404);
};
