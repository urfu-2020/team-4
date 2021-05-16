// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { Sequelize, STRING } from 'sequelize';
import { db } from '../databaseConfig/database';

const User = db.define('user', {
    // Модель пользователя для взаимодействия с БД, пока только два поля
    // id - SERIAL PRIMARY KEY
    // githubid - VARCHAR(255) ник на гитхабе, при авторизации будет добавляться в бд
    githubid: {
        type: STRING
    }
}, {
    timestamps: false
});

export const user = User;
