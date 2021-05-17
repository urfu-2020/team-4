import { Application } from 'express';

import { PassportStatic } from 'passport';
import { NextServer } from 'next/dist/server/next';
import * as contacts from './controllers/users';
import * as messages from './controllers/messages';
import * as chats from './controllers/chats';

const isAuthForApi = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        const error = { code: 401, message: 'unauthorized user' };
        res.status(401).json(error);
    }
};

const isAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

export default (server: Application, passport: PassportStatic, nextApp: NextServer): void => {
    server.get('/api/contacts', isAuthForApi, contacts.list);
    server.get('/api/contacts/:id', isAuthForApi, contacts.item);

    server.get('/api/chat/:chatId/message/list', isAuthForApi, messages.list);
    server.post('/api/chat/:chatId/message', isAuthForApi, messages.sendMessage);

    server.post('/chat', isAuthForApi, chats.create);
    server.post('/api/chat/findOrCreate', isAuthForApi, chats.findOrCreate);
    server.get('/api/chat/listByUser', isAuthForApi, chats.listByUser);

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
