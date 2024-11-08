import fastify from 'fastify';
import bcrypt from 'bcryptjs';

const server = fastify();

server.get('/ping', async(_request, _reply) => {
  const password = bcrypt.hashSync('admin', 10);
  return `${password}`;
});

// 0.0.0.0 for docker
server.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});