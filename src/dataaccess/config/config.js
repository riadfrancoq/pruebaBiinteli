import { config } from "dotenv";
config();

const DBconfig = {
    PORT: process.env.PORT,
    HOST : process.env.HOST,
    USER : process.env.USER_DB,
    PASSWORD : process.env.PASSWORD,
    DB : process.env.DB,
    DIALECT : process.env.DIALECT,
    POOL : {
        max: process.env.POOL_MAX,
        min: process.env.POOL_MIN,
        acquire: process.env.POOL_ACQUIRE,
        idle: process.env.POOL_IDLE
    }
}

export default DBconfig;