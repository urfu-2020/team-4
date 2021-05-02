import { Request, Response } from 'express';
import { user } from '../models/user';

export function list(_req: Request, res: Response): void {
    // eslint-disable-next-line no-warning-comments
    // Список всех пользователей
    user.findAll().then(users => {
        res.json(users);
    })
    // eslint-disable-next-line no-console
        .catch(err => console.log(err));
}

export function item(req: Request, res: Response): void {
    // eslint-disable-next-line no-warning-comments
    // Конкретный пользователь
    const { id } = req.params;
    user.findOne({ where: { githubid: id } }).then(usr => {
        res.json(usr);
    })
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
}
