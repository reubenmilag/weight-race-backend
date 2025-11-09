import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import weightRoutes from './weightRoutes.js';
// import habitRoutes from './habitRoutes.js';
import challengeRoutes from './challengeRoutes.js';

export default async function routes(fastify, opts) {
    fastify.register(authRoutes, { prefix: '/auth' });
    fastify.register(userRoutes, { prefix: '/users' });
    fastify.register(weightRoutes, { prefix: '/weights' });
    // fastify.register(habitRoutes, { prefix: '/habits' });
    fastify.register(challengeRoutes, { prefix: '/challenges' });
}
