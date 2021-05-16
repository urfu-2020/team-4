// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Sequelize, {STRING, INTEGER, DATE, ARRAY, NUMBER} from 'sequelize';
import { db } from '../databaseConfig/database';

const Chat = db.define('chat', {
    // Модель чата
    // id - SERIAL PRIMARY KEY
    // createdAt - DATETIME время создания сообщения
    name: {
        type: STRING,
        comment: 'Название чата'
    },
    type: {
        type: STRING
    },
    createdAt: {
        type: DATE,
        defaultValue: Sequelize.NOW
    },
    users: {
        type: ARRAY(STRING)
    }
}, {
    timestamps: false
});

(async () => {
    await Chat.sync({ alter: true });
})();

export const chat = Chat;
