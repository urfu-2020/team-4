/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';

import bodyParser from 'body-parser';
import config from 'config';
import express, { NextFunction as Next, Request, Response } from 'express';
import morgan from 'morgan';
import nextjs from 'next';
import 'isomorphic-fetch';

import render from './middlewares/render';
import routes from './routes';

const exSession = require('express-session');
const passport = require('passport');
import { user } from './models/user';
const githubPassport = require('passport-github');

const app = express();
const nextApp = nextjs({ dev: process.env.NODE_ENV !== 'production' });

// Данные для авторизации
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const sessionSecret = process.env.EXPRESS_SESSION_SECRET;

// Настраиваем сессии
app.use(exSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // При деплое нужно будет изменить secure на true (возможно:) )
        secure: false,
        maxAge: 72 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (usr, cb) {
    cb(null, usr.id);
});

passport.deserializeUser(function (id, cb) {
    cb(null, id);
});

// Авторизация
const GitHubStrategy = githubPassport.Strategy;
const cbAddress = process.env.AUTH_CB_ADDRESS;

passport.use(new GitHubStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: cbAddress
},
function (accessToken, refreshToken, profile, cb) {
    user.findOrCreate({
        where: { githubid: profile._json.login }
    })
        // eslint-disable-next-line no-console
        .then(usr => console.log(usr))
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
    cb(null, profile);
}
));
// Дальше будет ещё немного авторизации

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

routes(app, passport);

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
