// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Sequelize, { STRING, INTEGER, TEXT, DATE } from 'sequelize';
import { db } from '../databaseConfig/database';
import { user } from './user';
import { chat } from './chat';

const Message = db.define('message', {
    // Модель сообщения
    // id - SERIAL PRIMARY KEY
    // createdAt - DATETIME время создания сообщения
    authorId: {
        type: INTEGER,
        references: {
            model: user,
            key: 'id'
        },
        allowNull: false,
        comment: 'Ид автора сообщения'
    },
    chatId: {
        type: INTEGER,
        references: {
            model: chat,
            key: 'id'
        },
        allowNull: false,
        comment: 'Чат, которому принадлежит сообщение'
    },
    value: {
        type: TEXT,
        comment: 'Текст сообщения'
    },
    createdAt: {
        type: DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

(async () => {
    await Message.sync({ alter: true });
})();

export const message = Message;
