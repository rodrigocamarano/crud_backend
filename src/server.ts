import express from 'express';

const server = express();
server.use(express.json());

server.get('/', (request, response) => {
  return response.json({ status: 'Ok' });
});

export default server;
