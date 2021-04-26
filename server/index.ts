import path from 'path';

import bodyParser from 'body-parser';
import config from 'config';
import express, { NextFunction as Next, Request, Response } from 'express';
import morgan from 'morgan';
import nextjs from 'next';
import 'isomorphic-fetch';

import render from './middlewares/render';
import routes from './routes';

const app = express();
const nextApp = nextjs({ dev: process.env.NODE_ENV !== 'production' });

if (config.get('debug')) {
    app.use(morgan('dev'));
}

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

app.use(bodyParser.json());

app.use((err: Error, _req: Request, _res: Response, next: Next) => {
    console.error(err.stack);

    next();
});

app.use(render(nextApp));

routes(app);

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: Next) => {
    console.error(err.stack);

    res.sendStatus(500);
});

const port = config.get('port');

nextApp.prepare().then(() => {
    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});
