import express from 'express';

const server = express();
server.use(express.json());

server.get('/', (request, response) => response.json({ status: 'Ok' }));

export default server;
