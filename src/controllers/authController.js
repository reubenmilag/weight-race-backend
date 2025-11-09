import { AuthService } from '../services/authService.js';
import { ValidationError, UnauthorizedError } from '../utils/errorTypes.js';

export const AuthController = {
    register: async (request, reply) => {
        const db = request.server.db;
        try {
            const user = await AuthService.register(db, request.body);

            const token = request.server.jwt.sign({ userId: user.id });

            return reply.code(201).send({
                user: {
                    id: user.id,
                    email: user.email,
                    displayName: user.displayName
                },
                token
            });
        } catch (err) {
            if (err instanceof ValidationError) {
                return reply.code(err.statusCode).send({ message: err.message });
            }
            request.log.error(err);
            return reply.code(500).send({ message: 'Internal server error' });
        }
    },

    login: async (request, reply) => {
        const db = request.server.db;
        try {
            const user = await AuthService.login(db, request.body);
            const token = request.server.jwt.sign({ userId: user.id });

            return reply.send({
                user: {
                    id: user.id,
                    email: user.email,
                    displayName: user.display_name
                },
                token
            });
        } catch (err) {
            if (err instanceof UnauthorizedError) {
                return reply.code(err.statusCode).send({ message: err.message });
            }
            request.log.error(err);
            return reply.code(500).send({ message: 'Internal server error' });
        }
    }
};
