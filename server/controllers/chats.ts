import { Request, Response } from 'express';
import { Chat as chatQuery, ChatTypes } from '../models/chat';
import { Op } from 'sequelize';

export function create({ body: { name } }: {
    body: { name: string }
}, res: Response): void {
    chatQuery.create({
        name: name
    })
        .then(r => res.status(200).json(r.toJSON()))
        .catch(e => {
            console.error(e.toString());
            res.status(400).json({ error: { code: 400, message: e.toString() } });
        });
}

export function findOrCreate(req: Request, res: Response): void {
    const queryUsers = req.body.users;
    chatQuery.findOrCreate({ where: { users: queryUsers.sort((a, b) => a - b) },
        defaults: {
            type: ChatTypes.PRIVATE
        } })
        .then(chat => {
            res.json({ chat: {
                id: chat[0].getDataValue('id'),
                name: chat[0].getDataValue('name'),
                type: chat[0].getDataValue('type'),
                users: chat[0].getDataValue('users')
            } });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ error: { code: 400, message: err.toString() } });
        });
}

export function listByUser(req: Request, res: Response): void {
    chatQuery.findAll({
        where: {
            users: {
                [Op.contains]: [req.user.id]
            }
        }
    }).then((chats) => {
        res.status(200).json(chats);
    })
        .catch((err) => {
            console.error(err);
            res.status(400).json({ error: { code: 400, message: err.toString() } });
        });
}
