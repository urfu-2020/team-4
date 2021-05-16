import {Request, Response} from 'express';
import { Message } from '../models/message';
import { Chat } from '../models/chat';
import { Op } from "sequelize";

export function list({ params: { chatId }, body: { page, count } }: {
    params: { chatId: number },
    body: { page: number, count: number }
}, res: Response): void {
    Message.findAndCountAll({
        order: [
            ['createdAt', 'DESC']
        ],
        offset: (page - 1) * count,
        limit: count,
        where: {
            chatId: chatId
        }
    }).then(rowsAndCount =>
        res.json({messages: rowsAndCount.rows.reverse(), count: rowsAndCount.count})
    )
        // eslint-disable-next-line no-console
        .catch(e => {
            console.error(e.toString());
            res.status(400).json(e.toString())
        });
}

export function sendToUser(req: Request , res: Response): void {
    Chat.findOne({
        where: {
            users: {
                [Op.contains]: [req.user.username, req.params.userId]
            },
            type: 'private'
        }
    }).then((chat) => {
        if (!chat) {
            Chat.create({
                users: [req.user.username, req.params.userId],
                type: 'private',
                name: 'default'
            }).then((chat) => {
                if (req.body.message)
                    createMessage(chat, req.body.message, res);
                else
                    res.status(400);
            });
        } else {
            if (req.body.message)
                createMessage(chat, req.body.message, res);
            else
                res.status(400);
        }
    }).catch(e => {
        console.error(e.toString());
        res.status(400).json(e.toString())
    });
}

function createMessage(chat, message: string, res: Response) {
    Message.create({
        chatId: chat.get('id'),
        authorId: 1,
        value: message
    })
        .then(r => res.status(200).json(r.toJSON()))
        .catch(e => {
            console.error(e.toString());
            res.status(400).json(e.toString())
        });
}
