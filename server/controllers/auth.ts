import { Application } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exSession = require('express-session');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const passport = require('passport');
import { user } from '../models/user';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const githubPassport = require('passport-github');

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const sessionSecret = process.env.EXPRESS_SESSION_SECRET;

export default (app: Application): void => {
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
            .then(() => {
                cb(null, profile);
            })
            .catch(err => {
                console.error(err);
                cb(err, null);
            });
    }
    ));
};
