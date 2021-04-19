import path from 'path';

import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import morgan from 'morgan';

import routes from './routes';

const app = express();

if (config.get('debug')) {
    app.use(morgan('dev'));
}

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({
    extended: true
}));

routes(app);

const port = config.get('port');

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});
