import { Sequelize } from 'sequelize';
import DBconfig from '../config/config.js';
import models from './models/init-models.js';
const {HOST, USER, PASSWORD, DB, DIALECT ,POOL} = DBconfig;
const {MAX, MIN, ACQUIRE, IDLE} = POOL;

const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        logging: false,
        host: HOST,
        dialect: DIALECT,
        operatorsAliases: '0',
        pool: {
            max: MAX,
            min: MIN,
            acquire: ACQUIRE,
            idle: IDLE
        }
    }

)

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error(err);    
}


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tables = models(sequelize);

db.sequelize.sync({force: false}).
then(()=> {
    console.log('DATABASE WORKING');
});

export default db;