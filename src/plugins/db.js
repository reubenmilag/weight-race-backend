import fp from 'fastify-plugin';
import { getDbPool } from '../config/db.js';

export default fp(async function dbPlugin(fastify) {
    const pool = getDbPool();
    fastify.decorate('db', pool);
});