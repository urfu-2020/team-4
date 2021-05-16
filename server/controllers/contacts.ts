import { Request, Response } from 'express';
import { user } from '../models/user';

export function list(_req: Request, res: Response): void {
    user.findAll().then(users => {
        const allUsers = [];
        for (const usr of users) {
            const nickname = usr.getDataValue('githubid');
            const avatar = `https://avatars.githubusercontent.com/${nickname}`;
            allUsers.push({ nickname, avatar });
        }
        res.json({ contacts: allUsers });
    })
        .catch(err => console.error(err));
}

export function item(req: Request, res: Response): void {
    const { id } = req.params;
    user.findOne({ where: { githubid: id } }).then(usr => {
        res.json(usr);
    })
        .catch(err => console.error(err));
}