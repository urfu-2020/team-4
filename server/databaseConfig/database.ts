import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

// Ссылка на бд в будущем изменится, это старый формат
const dbUrl = `postgres://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}` +
    `@dumbo.db.elephantsql.com:5432/${process.env.DB_ADMIN}`;

export const db = new Sequelize(dbUrl);
