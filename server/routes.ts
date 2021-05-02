import { Application } from 'express';


import { error404 } from './controllers/errors';
import { item, list } from './controllers/contacts';
import { PassportStatic } from 'passport';

export default (app: Application, passport: PassportStatic): void => {
    app.get('/contacts', list);

    app.get('/contacts/:id', item);

    const isAuth = (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    };

    app.get('/', isAuth, (req, res) => {
        res.redirect('/contacts');
    });

    app.get('/login', (req, res) => {
        if (req.user) {
            return res.redirect('/');
        }
        res.redirect('/auth/github');
    });

    app.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/login');
    });

    app.get('/auth/github',
        passport.authenticate('github'));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        }
    );

    app.all('*', error404);
};
