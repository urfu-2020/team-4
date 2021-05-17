import { Request, Response } from 'express';
import { User } from '../models/user';

export function list(_req: Request, res: Response): void {
    User.findAll().then(users => {
        const allUsers = [];
        for (const usr of users) {
            const nickname = usr.getDataValue('githubLogin');
            const avatar = usr.getDataValue('avatar');
            allUsers.push({ nickname, avatar });
        }
        res.json({ contacts: allUsers });
    })
        .catch(e => {
            console.error(e.toString());
            res.status(400).json({ code: 400, message: e.toString() });
        });
}

export function item(req: Request, res: Response): void {
    const { id } = req.params;
    User.findOne({ where: { githubLogin: id } }).then(usr => {
        res.json(usr);
    })
        .catch(e => {
            console.error(e.toString());
            res.status(400).json({ code: 400, message: e.toString() });
        });
}
