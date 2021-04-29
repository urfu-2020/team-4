import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line max-len
const dbUrl = `postgres://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@dumbo.db.elephantsql.com:5432/${process.env.DB_ADMIN}`;

export const db = new Sequelize(dbUrl);
