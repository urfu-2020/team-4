import { Application } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exSession = require('express-session');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const passport = require('passport');
import { User } from '../models/user';
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

    passport.serializeUser(function (profile, cb) {
        cb(null, profile);
    });

    passport.deserializeUser(function (profile, cb) {
        cb(null, profile);
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
        User.findOrCreate({
            where: { githubId: profile._json.login },
            defaults: {
                avatar: profile._json.avatar_url,
                email: profile._json.email
            }
        })
            .then(([u, created]) => {
                profile.userId = u.get('id');
                cb(null, profile);
            })
            .catch(err => {
                console.error(err);
                cb(err, null);
            });
    }
    ));
};
