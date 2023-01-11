import { Sequelize } from 'sequelize';

require('dotenv').config();

const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    timezone: '+07:00',
    dialectOptions: {
        // useUTC: false,
        dateStrings: true,
        typeCast: true,
    },
};

const connectDB = (): Sequelize => {
    if (config && config.database && config.username && config.host) {
        return new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: 'mysql',
            dialectOptions: config.dialectOptions,
            timezone: config.timezone,
        });
    }
    console.log('không tìm thấy thông tim kết nối database');
};

let sequelize = connectDB();

export { sequelize };
