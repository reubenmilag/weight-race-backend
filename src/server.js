import { buildApp } from './app.js';
import { config } from './config/config.js';

const app = buildApp();

app.listen({ port: config.port, host: '0.0.0.0' })
    .then(() => {
        app.log.info(`Server listening on port ${config.port}`);
    })
    .catch((err) => {
        app.log.error(err);
        process.exit(1);
    });
