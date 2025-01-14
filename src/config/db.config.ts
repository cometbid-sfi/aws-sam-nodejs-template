import { PoolOptions } from 'mysql2';
import config from './config';
import mysql from 'mysql2/promise';

const access: PoolOptions = {
    host: config.getDatabaseConfig().db_host,
    user: config.getDatabaseConfig().db_username,
    database: config.getDatabaseConfig().database,
};

const connection = mysql.createConnection(access);

export default connection;
