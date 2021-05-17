import { Request, Response } from 'express';
import { Chat as chatQuery } from '../models/chat';

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

export function findOrCreate(req: Request, res: Response): void {
    const splitedQueryUsers = req.params.users.split('&');
    chatQuery.findOrCreate({ where: { users: splitedQueryUsers },
        defaults: {
            name: splitedQueryUsers[1],
            type: 'default'
        } })
        .then(chat => {
            res.redirect(`/api/chat/${chat[0].getDataValue('id')}/message/list`);
        })
        .catch(err => {
            console.error(err);
        });
}
