import { ChallengeController } from '../controllers/challengeController.js';

export default async function challengeRoutes(fastify) {
    fastify.post('/', {
        preHandler: [fastify.authenticate],
        handler: ChallengeController.createChallenge
    });

    // later:
    // - POST /:id/join
    // - POST /:id/invite
    // - GET /active
    // - GET /mine
}
