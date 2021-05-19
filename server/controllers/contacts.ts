import { Request, Response } from 'express';
import { User } from '../models/user';

export function list(_req: Request, res: Response): void {
    User.findAll().then(users => {
        const allUsers = [];
        for (const usr of users) {
            const nickname = usr.getDataValue('githubLogin');
            const avatar = usr.getDataValue('avatar');
            const id = usr.get('id');
            allUsers.push({ nickname, avatar, id });
        }
        res.json({ users: allUsers });
    })
        .catch(err => {
            console.error(err.toString());
            res.status(400).json({ error: { code: 400, message: err.toString() } });
        });
}

export function item(req: Request, res: Response): void {
    const { id } = req.params;
    User.findOne({ where: { id: id } }).then(usr => {
        res.json({ user: usr });
    })
        .catch(err => {
            console.error(err);
            res.status(400).json({ error: { code: 400, message: err.toString() } });
        });
}
