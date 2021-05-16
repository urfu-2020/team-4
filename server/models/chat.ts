// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Sequelize, { STRING, INTEGER, DATE } from 'sequelize';
import { db } from '../databaseConfig/database';

const Chat = db.define('chat', {
    // Модель чата
    // id - SERIAL PRIMARY KEY
    // createdAt - DATETIME время создания сообщения
    name: {
        type: STRING,
        comment: 'Название чата'
    },
    createdAt: {
        type: DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

(async () => {
    await Chat.sync({ alter: true });
})();

export const chat = Chat;
