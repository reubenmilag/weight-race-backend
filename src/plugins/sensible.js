import fp from 'fastify-plugin';

export default fp(async function sensiblePlugin(fastify) {
    fastify.register(import('@fastify/sensible'));
});
