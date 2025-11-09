import fp from 'fastify-plugin';

export default fp(async function corsPlugin(fastify) {
    fastify.register(import('@fastify/cors'), {
        origin: '*', // You can restrict to your Flutter app origin later
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    });
});
