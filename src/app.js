import Fastify from 'fastify';
import { config } from './config/config.js';

// plugins
import dbPlugin from './plugins/db.js';
import jwtPlugin from './plugins/jwt.js';
import corsPlugin from './plugins/cors.js';
import sensiblePlugin from './plugins/sensible.js';

// routes
import routes from './routes/index.js';

export function buildApp() {
    const fastify = Fastify({
        logger: true
    });

    // register plugins
    fastify.register(sensiblePlugin);
    fastify.register(corsPlugin);
    fastify.register(dbPlugin);
    fastify.register(jwtPlugin);

    // register routes
    fastify.register(routes, { prefix: '/api/v1' });

    return fastify;
}
