import { Request, Response } from 'express';
import User from 'models/user';

export function list(_req: Request, res: Response): void {
    // eslint-disable-next-line no-warning-comments
    // TODO список всех пользователей
    const contacts: User[] = [];

    res.json(contacts);
}

export function item(req: Request, res: Response): void {
    // eslint-disable-next-line no-warning-comments
    // TODO конкретный пользователь
    const { id } = req.params;

    res.json({ id });
}
