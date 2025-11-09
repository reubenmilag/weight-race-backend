import { WeightController } from '../controllers/weightController.js';

export default async function weightRoutes(fastify) {
    fastify.post('/', {
        preHandler: [fastify.authenticate],
        handler: WeightController.addEntry
    });

    fastify.get('/', {
        preHandler: [fastify.authenticate],
        handler: WeightController.listEntries
    });
}
