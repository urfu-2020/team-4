import {Request, Response} from 'express';
import { Message as messageQuery } from '../models/message';
import { Chat as chatQuery} from '../models/chat';
import {fn, Op, col} from "sequelize";

export function list({ params: { id }, body: { page, count } }: {
    params: { id: number },
    body: { page: number, count: number }
}, res: Response): void {
    messageQuery.findAndCountAll({
        order: [
            ['createdAt', 'DESC']
        ],
        offset: (page - 1) * count,
        limit: count,
        where: {
            chatId: id
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
    chatQuery.findOrCreate({
        where: {
            users: {
                [Op.contains]: [req.user.userId, req.params.userId]
            },
            type: 'private'
        }
    }).then(([ch, created]) => {
        messageQuery.create({
            chatId: ch.get('id'),
            authorId: 1,
            value: req.body.message
        })
            .then(r => res.status(200).json(r.toJSON()))
            .catch(e => {
                console.error(e.toString());
                res.status(400).json(e.toString())
            });
    }).catch(e => {
        console.error(e.toString());
        res.status(400).json(e.toString())
    });
}
