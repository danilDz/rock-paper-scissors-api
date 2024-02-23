import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UseCasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { GameController } from './game/game.controller';
import { CurrentUserMiddleware } from '../common/middlewares/current-user.middleware';
import { EnvironmentConfigService } from '../config/environment/environment-config.service';
import { JwtRedisService } from '../services/jwt-redis/jwt-redis.service';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [UseCasesProxyModule.register(), TypeOrmModule.forFeature([User])],
  controllers: [AuthController, GameController],
  providers: [
    EnvironmentConfigService,
    JwtRedisService,
    DatabaseUserRepository,
  ],
})
export class ControllersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .exclude('auth/signin', 'auth/signup')
      .forRoutes(AuthController, GameController);
  }
}
