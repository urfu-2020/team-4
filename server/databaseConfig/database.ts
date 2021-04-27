import { Sequelize } from 'sequelize';

// eslint-disable-next-line max-len
const dbUrl = 'postgres://igtbrvfn:lXg06jXlSBVqqtHoUO97WqacF9zKPQkx@dumbo.db.elephantsql.com:5432/igtbrvfn';

export const db = new Sequelize(dbUrl);
