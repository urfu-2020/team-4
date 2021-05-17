// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Sequelize, { STRING, INTEGER, TEXT, DATE } from 'sequelize';
import { db } from '../databaseConfig/database';
import { User } from './user';
import { Chat } from './chat';

export const Message = db.define('message', {
    // Модель сообщения
    // id - SERIAL PRIMARY KEY
    // createdAt - DATETIME время создания сообщения
    authorLogin: {
        type: STRING,
        references: {
            model: User,
            key: 'githubLogin'
        },
        allowNull: false,
        comment: 'Логин автора сообщения'
    },
    chatId: {
        type: INTEGER,
        references: {
            model: Chat,
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
