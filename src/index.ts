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
    res.send('Lorem ipsum dolor sit amett!');
});

const port = config.get('port');

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});
