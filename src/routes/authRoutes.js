import { AuthController } from '../controllers/authController.js';

export default async function authRoutes(fastify) {
    fastify.post('/register', AuthController.register);
    fastify.post('/login', AuthController.login);
}
