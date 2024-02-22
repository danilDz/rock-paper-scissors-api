import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './infrastructure/logger/logger.service';

const logger = new LoggerService();
const PORT = process.env.PORT || 3001;
let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  server = await app.listen(PORT);
}

bootstrap();

process.on('uncaughtException', (err) => {
  logger.error(err.message, err.stack, 'Uncaught Exception');
  process.exitCode = 1;
});

process.on('exit', (code) => {
  logger.log(`exit with code ${code}`, 'On Exit');
  try {
    server.close();
  } catch (err) {
    logger.warn(err.message, 'On Exit');
  }
  process.kill(process.pid, 'SIGTERM');
});
