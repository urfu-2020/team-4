import { Request, Response } from 'express';
import { Chat as chatQuery, ChatTypes } from '../models/chat';
import { Message } from '../models/message';
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
            res.status(400).json({ code: 400, message: e.toString() });
        });
}

// eslint-disable-next-line no-unused-vars
export function findOrCreate(req: Request, res: Response): void {
    const queryUsers = req.body.users;
    chatQuery.findOrCreate({ where: { users: queryUsers },
        defaults: {
            type: ChatTypes.PRIVATE
        } })
        .then(chat => {
            Message.findAndCountAll({ where: { chatId: chat[0].getDataValue('id') }, limit: 1 })
                .then(data => {
                    if (data.count === 0) {
                        Message.create({
                            chatId: chat[0].getDataValue('id'),
                            authorId: queryUsers[0],
                            value: 'Привет! Как круто, что ты тоже используешь Kilogram!'
                        }).catch(err => {
                            console.error(err);
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                });
            res.redirect(`/api/chat/${chat[0].getDataValue('id')}/message/list`);
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ code: 400, message: err.toString() });
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
            res.status(400).json({ code: 400, message: err.toString() });
        });
}
