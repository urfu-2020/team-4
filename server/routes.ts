import { Application } from 'express';


import { error404 } from './controllers/errors';
import { item, list } from './controllers/contacts';

export default (app: Application): void => {
    app.get('/contacts', list);

    app.get('/contacts/:id', item);

    app.all('*', error404);
};
