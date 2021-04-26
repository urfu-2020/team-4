import { NextFunction as Next, Request, Response } from 'express';
import { NextServer } from 'next/dist/server/next';

export default (nextApp: NextServer) => (req: Request, res: Response, next: Next): void => {
    req.nextApp = nextApp;
    res.renderPage = (pathname, query) => {
        nextApp.render(req, res, pathname, query);
    };

    next();
};
