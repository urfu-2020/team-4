import path from 'path';

import { Request, Response } from 'express';

export function list(req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, '..', 'views', 'user-list.html'));
}

export function item(req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, '..', 'views', 'chat.html'));
}
