import { WeightService } from '../services/weightService.js';
import { ValidationError } from '../utils/errorTypes.js';

export const WeightController = {
    addEntry: async (request, reply) => {
        const db = request.server.db;
        const userId = request.user.userId;

        try {
            const entry = await WeightService.addEntry(db, userId, request.body);
            return reply.code(201).send(entry);
        } catch (err) {
            if (err instanceof ValidationError) {
                return reply.code(err.statusCode).send({ message: err.message });
            }
            request.log.error(err);
            return reply.code(500).send({ message: 'Internal server error' });
        }
    },

    listEntries: async (request, reply) => {
        const db = request.server.db;
        const userId = request.user.userId;
        const limit = request.query.limit ? parseInt(request.query.limit, 10) : 50;

        try {
            const entries = await WeightService.getEntries(db, userId, limit);
            return reply.send(entries);
        } catch (err) {
            request.log.error(err);
            return reply.code(500).send({ message: 'Internal server error' });
        }
    }
};
