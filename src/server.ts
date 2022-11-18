import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import routes from './routes';

const server = express();
server.use(helmet());
server.use(compression());
server.use(cors());
server.use(express.json());

server.use('/', routes);

export default server;
