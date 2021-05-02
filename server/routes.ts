import { Application } from 'express';


import { error404 } from './controllers/errors';
import * as contacts from './controllers/users';
import * as messages from './controllers/messages';
import * as chats from './controllers/chats';

export default (app: Application): void => {
    app.get('/', contacts.list);

    app.get('/contacts', contacts.list);
    app.get('/contacts/:id', contacts.item);

    app.post('/chat/:id/message', messages.create);
    app.post('/chat/:id/message/list', messages.list);

    app.post('/chat', chats.create);

    app.all('*', error404);
};
