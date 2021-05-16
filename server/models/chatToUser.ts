// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { INTEGER } from 'sequelize';
import { db } from '../databaseConfig/database';
import { user } from './user';
import { chat } from './chat';

const ChatToUser = db.define('chatToUser', {
    chatId: {
        type: INTEGER,
        references: {
            model: chat,
            key: 'id'
        },
        allowNull: false,
        comment: 'Ид чата, в котором состоит пользователь'
    },
    userId: {
        type: INTEGER,
        references: {
            model: user,
            key: 'id'
        },
        allowNull: false,
        comment: 'Ид пользователя, который состоит в чате'
    }
});

(async () => {
    await ChatToUser.sync({ alter: true });
})();

export const chatToUser = ChatToUser;
