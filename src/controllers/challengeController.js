import { ChallengeService } from '../services/challengeService.js';
import { ValidationError } from '../utils/errorTypes.js';

export const ChallengeController = {
    createChallenge: async (request, reply) => {
        const db = request.server.db;
        const userId = request.user.userId;

        try {
            const challenge = await ChallengeService.createChallenge(db, userId, request.body);
            return reply.code(201).send(challenge);
        } catch (err) {
            if (err instanceof ValidationError) {
                return reply.code(err.statusCode).send({ message: err.message });
            }
            request.log.error(err);
            return reply.code(500).send({ message: 'Internal server error' });
        }
    }
};
