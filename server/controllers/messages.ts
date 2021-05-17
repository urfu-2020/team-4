import { Request, Response } from 'express';
import { Message } from '../models/message';
import { Chat } from '../models/chat';
import { Op } from 'sequelize';

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
        res.json({ messages: rowsAndCount.rows.reverse(), count: rowsAndCount.count })
    )
        // eslint-disable-next-line no-console
        .catch(e => {
            console.error(e.toString());
            res.status(400).json({ code: 400, message: e.toString() });
        });
}

export function sendToUser(req: Request, res: Response): void {
    Chat.findOne({
        where: {
            users: {
                [Op.contains]: [req.user.username, req.params.userId]
            },
            type: 'private'
        }
    }).then((chat) => {
        if (!chat) {
            res.status(403).json({ code: 403, message: 'Chat not found' });
        } else {
            // eslint-disable-next-line no-lonely-if
            if (req.body.message) {
                Message.create({
                    chatId: chat.get('id'),
                    authorLogin: req.user.username,
                    value: req.body.message
                })
                    .then(r => res.status(200).json(r.toJSON()))
                    .catch(e => {
                        console.error(e.toString());
                        res.status(400).json({ code: 400, message: e.toString() });
                    });
            } else {
                res.status(400).json({ code: 400, message: 'No message found' });
            }
        }
    // eslint-disable-next-line newline-per-chained-call
    }).catch(e => {
        console.error(e.toString());
        res.status(400).json({ code: 400, message: e.toString() });
    });
}
