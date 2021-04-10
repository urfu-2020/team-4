import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import morgan from 'morgan';

const app = express();

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Changed this text just to test CD is working!');
});

const port = config.get('port');

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});
