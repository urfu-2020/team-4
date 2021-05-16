import {Request, Response} from 'express';
import { message as messageQuery } from '../models/message';
import { chat as chatQuery} from '../models/chat';
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

export async function sendToUser(req: Request , res: Response): Promise<void> {
    let [ch, created] = await chatQuery.findOrCreate({
        where: {
            users: {
                [Op.contains]: [req.user.userId, req.params.userId]
            },
            type: 'private'
        }
    })
    await messageQuery.create({
        chatId: ch.id,
        authorId: 1,
        value: req.body.message
    })
        .then(r => res.status(200).json(r.toJSON()))
        .catch(e => {
            console.error(e.toString());
            res.status(400).json(e.toString())
        });
}
