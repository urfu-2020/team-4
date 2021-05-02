import { Response } from 'express';
import { chat as chatQuery } from '../models/chat';

export function create({ body: { name } }: {
    body: { name: string }
}, res: Response): void {
    chatQuery.create({
        name: name
    })
        .then(r => res.status(200).json(r.toJSON()))
        .catch(() => res.sendStatus(400));
}
