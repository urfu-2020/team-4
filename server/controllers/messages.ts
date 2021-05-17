import { Request, Response } from 'express';
import { Message } from '../models/message';
import { Chat } from '../models/chat';
import { Op } from 'sequelize';

export function list(req: Request, res: Response): void {
    // Пока что выводит просто все сообщения из выбранного чата
    // const page = req.params.page;
    // const count = req.params.count;
    const chatId = req.params.chatId;
    Message.findAndCountAll({
        order: [
            ['createdAt', 'DESC']
        ],
        // offset: (page - 1) * count,
        // limit: count,
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

export function sendMessage(req: Request, res: Response): void {
    Chat.findOne({
        where: {
            id: req.params.chatId,
            users: {
                [Op.contains]: [req.user.id]
            }
        }
    }).then((chat) => {
        if (!chat) {
            res.status(403).json({ code: 403, message: 'Chat for current user not found' });
        } else {
            // eslint-disable-next-line no-lonely-if
            if (req.body.message) {
                Message.create({
                    chatId: chat.get('id'),
                    authorId: req.user.id,
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
