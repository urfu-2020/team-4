import { Response } from 'express';
import { message as messageQuery } from '../models/message';

export function list({ params: { id }, body: { page, count } }: {
    params: { id: number },
    body: { page: number, count: number }
}, res: Response): void {
    messageQuery.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        offset: (page - 1) * count,
        limit: count,
        where: {
            chatId: id
        }
    }).then(messages =>
        res.json(messages.reverse())
    )
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
}

export function create({ params: { id }, body: { userId, message } }: {
    params: { id: number },
    body: { userId: number, message: string }
}, res: Response): void {
    messageQuery.create({
        chatId: id,
        authorId: userId,
        value: message
    })
        .then(r => res.status(200).json(r.toJSON()))
        .catch(e => res.status(400).json(e.toString()));
}
