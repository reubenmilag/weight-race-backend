import fs from 'fs/promises';
import path from 'path';
import { getDbPool } from '../config/db.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function run() {
    const migrationsDir = __dirname;
    let files;
    try {
        files = await fs.readdir(migrationsDir);
    } catch (err) {
        console.error('Failed to read migrations directory:', err.message);
        process.exit(1);
    }

    const sqlFiles = files
        .filter((f) => f.endsWith('.sql'))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (sqlFiles.length === 0) {
        console.log('No .sql migration files found in', migrationsDir);
        process.exit(0);
    }

    const pool = getDbPool();
    let conn;
    try {
        conn = await pool.getConnection();
    } catch (err) {
        console.error('Failed to get DB connection:', err.message);
        process.exit(1);
    }

    try {
        for (const file of sqlFiles) {
            const fullPath = path.join(migrationsDir, file);
            console.log('Running migration:', file);
            const sql = await fs.readFile(fullPath, 'utf8');
            if (!sql.trim()) {
                console.log('Skipping empty migration:', file);
                continue;
            }
            // execute the file contents; pool was created with multipleStatements: true
            await conn.query(sql);
            console.log('Applied:', file);
        }
        console.log('Migrations complete');
    } catch (err) {
        console.error('Migration failed:', err.message);
        process.exit(1);
    } finally {
        try {
            if (conn) conn.release();
            // close pool gracefully
            await pool.end();
        } catch (_) {
            // ignore
        }
    }
}

run();
