import { createServer } from 'http';
import { app } from './app';
import logger from "./logger";

interface NodeError extends Error {
    syscall?: string;
    code?: string;
}

const normalizePort = (val: string) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

const errorHandler = (error: NodeError) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    logger.info('Listening on ' + bind);
});

server.listen(port);
