/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';

import bodyParser from 'body-parser';
import config from 'config';
import express, { NextFunction as Next, Request, Response } from 'express';
import morgan from 'morgan';
import nextjs from 'next';
import 'isomorphic-fetch';

import routes from './routes';
import auth from 'controllers/auth';

const passport = require('passport');

const nextApp = nextjs({ dev: process.env.NODE_ENV !== 'production' });
const handle = nextApp.getRequestHandler();
const port = config.get('port');

nextApp.prepare().then(() => {
    const server = express();

    if (config.get('debug')) {
        server.use(morgan('dev'));
    }

    const publicDir = path.join(__dirname, 'public');
    server.use(express.static(publicDir));

    server.use(bodyParser.json());

    server.use((err: Error, _req: Request, _res: Response, next: Next) => {
        console.error(err.stack);

        next();
    });

    auth(server);
    routes(server, passport, nextApp);

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // eslint-disable-next-line no-unused-vars
    server.use((err: Error, _req: Request, res: Response, _next: Next) => {
        console.error(err.stack);

        res.sendStatus(500);
    });

    server.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});
