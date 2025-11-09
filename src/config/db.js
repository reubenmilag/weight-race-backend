import mysql from 'mysql2/promise';
import { config } from './config.js';

let pool;

export function getDbPool() {
    if (!pool) {
        pool = mysql.createPool({
            host: config.db.host,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database,
            // allow executing multiple statements from SQL files
            multipleStatements: true,
            connectionLimit: 10
        });
    }
    return pool;
}
