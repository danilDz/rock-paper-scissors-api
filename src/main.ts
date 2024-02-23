import { NestFactory } from '@nestjs/core';
import JWTRedis from 'jwt-redis';
import { createClient, RedisClientType } from 'redis';
import { AppModule } from './app.module';
import { LoggerService } from './infrastructure/logger/logger.service';

const logger = new LoggerService();
const PORT = process.env.PORT || 3001;

let server;
let jwt: JWTRedis;
let redisClient: RedisClientType;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  redisClient = createClient({
    url: process.env.JWT_REDIS_URL,
  });
  await redisClient.connect();
  jwt = new JWTRedis(redisClient);

  server = await app.listen(PORT);
}

bootstrap();

export { jwt };

process.on('uncaughtException', (err) => {
  logger.error(err.message, err.stack, 'Uncaught Exception');
  process.exitCode = 1;
});

process.on('exit', (code) => {
  logger.log(`exit with code ${code}`, 'On Exit');
  try {
    redisClient.disconnect();
    server.close();
  } catch (err) {
    logger.warn(err.message, 'On Exit');
  }
  process.kill(process.pid, 'SIGTERM');
});
