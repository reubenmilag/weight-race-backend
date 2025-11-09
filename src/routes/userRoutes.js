import { UserModel } from '../models/userModel.js';

export default async function userRoutes(fastify) {
    // Get current user profile
    fastify.get('/me', {
        preHandler: [fastify.authenticate],
        handler: async (request, reply) => {
            const db = fastify.db;
            const user = await UserModel.findById(db, request.user.userId);
            return reply.send(user);
        }
    });
}
