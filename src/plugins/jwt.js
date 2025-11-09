import fp from 'fastify-plugin';
import { config } from '../config/config.js';

export default fp(async function jwtPlugin(fastify) {
    fastify.register(import('@fastify/jwt'), {
        secret: config.jwt.secret
    });

    fastify.decorate('authenticate', async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            return reply.code(401).send({ message: 'Unauthorized' });
        }
    });
});
