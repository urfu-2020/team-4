import { Application } from 'express';

import { item, list } from './controllers/contacts';
import { PassportStatic } from 'passport';
import { NextServer } from 'next/dist/server/next';

export default (server: Application, passport: PassportStatic, nextApp: NextServer): void => {
    const isAuthForApi = (req, res, next) => {
        if (req.user) {
            next();
        } else {
            const error = { code: 401, message: 'unauthorized user' };
            res.status(401).json(error);
        }
    };

    server.get('/api/contacts/:id', isAuthForApi, item);

    server.get('/api/contacts', isAuthForApi, list);

    const isAuth = (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    };

    server.get('/', (req, res) => {
        res.redirect('/contacts');
    });

    server.get('/contacts', isAuth, (req, res) => {
        return nextApp.render(req, res, '/contacts');
    });

    server.get('/contacts/:id', isAuth, (req, res) => {
        return nextApp.render(req, res, '/chat', { ...req.query, id: req.params.id });
    });

    server.get('/login', (req, res) => {
        if (req.user) {
            return res.redirect('/');
        }
        res.redirect('/auth/github');
    });

    server.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/login');
    });

    server.get('/auth/github',
        passport.authenticate('github'));

    server.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        }
    );
};
