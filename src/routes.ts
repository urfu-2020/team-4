import { Application } from 'express';


import { error404 } from './controllers/errors';
import { item, list } from './controllers/contacts';

export = (app: Application) => {
    app.get('/', list);

    app.get('/contacts', list);

    app.get('/contacts/:id', item);

    app.all('*', error404);
};
