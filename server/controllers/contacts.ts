import { Request, Response } from 'express';
import { user } from '../models/user';

export function list(_req: Request, res: Response): void {
    // eslint-disable-next-line no-warning-comments
    // Список всех пользователей
    user.findAll().then(users => {
        // eslint-disable-next-line prefer-const
        let allUsers = [];
        for (const usr of users) {
            // eslint-disable-next-line no-console
            const nickname = usr.getDataValue('githubid');
            // eslint-disable-next-line no-unused-vars
            const avatar = `https://avatars.githubusercontent.com/${nickname}`;
            // eslint-disable-next-line no-console
            console.log(nickname, avatar);
            allUsers.push({ nickname, avatar });
        }
        // eslint-disable-next-line no-console
        console.log(allUsers);
        // res.render('contacts', { contacts: allUsers });
        res.json({ contacts: allUsers });
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
