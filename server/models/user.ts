// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Sequelize, { STRING, DATE } from 'sequelize';
import { db } from '../databaseConfig/database';

export const User = db.define('user', {
    // Модель пользователя для взаимодействия с БД
    // id - SERIAL PRIMARY KEY
    githubLogin: {
        type: STRING,
        comment: 'Ид пользователя на гитхабе'
    },
    avatar: {
        type: STRING,
        comment: 'Аватарка пользователя'
    }
}, {
    timestamps: false
});

(async () => {
    await User.sync({ alter: true });
})();
