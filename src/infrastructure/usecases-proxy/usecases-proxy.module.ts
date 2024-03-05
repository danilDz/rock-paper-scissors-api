import { Module, DynamicModule } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';
import { SignupUseCase } from '../../usecases/auth/signup.usecase';
import { SigninUseCase } from 'src/usecases/auth/signin.usecase';
import { SignoutUseCase } from 'src/usecases/auth/signout.usecase';
import { DeleteUserUseCase } from 'src/usecases/auth/delete-user.usecase';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtRedisService } from '../services/jwt-redis/jwt-redis.service';
import { EnvironmentConfigService } from '../config/environment/environment-config.service';
import { JwtRedisModule } from '../services/jwt-redis/jwt-redis.module';
import { EnvironmentConfigModule } from '../config/environment/environment-config.module';
import { DatabaseGameRepository } from '../repositories/game.repository';
import { CreateGameUseCase } from 'src/usecases/game/create-game.usecase';
import { UpdateGameUseCase } from 'src/usecases/game/update-game.usecase';
import { DeleteGameUseCase } from 'src/usecases/game/delete-game.usecase';
import { GetGameUseCase } from 'src/usecases/game/get-game.usecase';

@Module({
  imports: [
    LoggerModule,
    RepositoriesModule,
    BcryptModule,
    JwtRedisModule,
    EnvironmentConfigModule,
  ],
})
export class UseCasesProxyModule {
  static SIGNUP_USECASE_PROXY = 'SignupUseCaseProxy';
  static SIGNIN_USECASE_PROXY = 'SigninUseCaseProxy';
  static SIGNOUT_USECASE_PROXY = 'SignoutUseCaseProxy';
  static DELETE_USER_USECASE_PROXY = 'DeleteUserUseCaseProxy';
  static CREATE_GAME_USECASE_PROXY = 'CreateGameUseCaseProxy';
  static UPDATE_GAME_USECASE_PROXY = 'UpdateGameUseCaseProxy';
  static DELETE_GAME_USECASE_PROXY = 'DeleteGameUseCaseProxy';
  static GET_GAME_USECASE_PROXY = 'GetGameUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [
            DatabaseUserRepository,
            BcryptService,
            JwtRedisService,
            EnvironmentConfigService,
          ],
          provide: UseCasesProxyModule.SIGNUP_USECASE_PROXY,
          useFactory: (
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
            jwtRedisService: JwtRedisService,
            jwtConfig: EnvironmentConfigService,
          ) =>
            new UseCaseProxy(
              new SignupUseCase(
                userRepo,
                bcryptService,
                jwtRedisService,
                jwtConfig,
              ),
            ),
        },
        {
          inject: [
            DatabaseUserRepository,
            BcryptService,
            JwtRedisService,
            EnvironmentConfigService,
          ],
          provide: UseCasesProxyModule.SIGNIN_USECASE_PROXY,
          useFactory: (
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
            jwtRedisService: JwtRedisService,
            jwtConfig: EnvironmentConfigService,
          ) =>
            new UseCaseProxy(
              new SigninUseCase(
                userRepo,
                bcryptService,
                jwtRedisService,
                jwtConfig,
              ),
            ),
        },
        {
          inject: [JwtRedisService, DatabaseUserRepository],
          provide: UseCasesProxyModule.SIGNOUT_USECASE_PROXY,
          useFactory: (
            jwtRedisService: JwtRedisService,
            userRepository: DatabaseUserRepository,
          ) =>
            new UseCaseProxy(
              new SignoutUseCase(jwtRedisService, userRepository),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UseCasesProxyModule.DELETE_USER_USECASE_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new DeleteUserUseCase(userRepository)),
        },
        {
          inject: [DatabaseGameRepository],
          provide: UseCasesProxyModule.CREATE_GAME_USECASE_PROXY,
          useFactory: (gameRepository: DatabaseGameRepository) =>
            new UseCaseProxy(new CreateGameUseCase(gameRepository)),
        },
        {
          inject: [DatabaseGameRepository],
          provide: UseCasesProxyModule.UPDATE_GAME_USECASE_PROXY,
          useFactory: (gameRepository: DatabaseGameRepository) =>
            new UseCaseProxy(new UpdateGameUseCase(gameRepository)),
        },
        {
          inject: [DatabaseGameRepository],
          provide: UseCasesProxyModule.DELETE_GAME_USECASE_PROXY,
          useFactory: (gameRepository: DatabaseGameRepository) =>
            new UseCaseProxy(new DeleteGameUseCase(gameRepository)),
        },
        {
          inject: [DatabaseGameRepository],
          provide: UseCasesProxyModule.GET_GAME_USECASE_PROXY,
          useFactory: (gameRepository: DatabaseGameRepository) =>
            new UseCaseProxy(new GetGameUseCase(gameRepository)),
        },
      ],
      exports: [
        UseCasesProxyModule.SIGNUP_USECASE_PROXY,
        UseCasesProxyModule.SIGNIN_USECASE_PROXY,
        UseCasesProxyModule.SIGNOUT_USECASE_PROXY,
        UseCasesProxyModule.DELETE_USER_USECASE_PROXY,
        UseCasesProxyModule.CREATE_GAME_USECASE_PROXY,
        UseCasesProxyModule.UPDATE_GAME_USECASE_PROXY,
        UseCasesProxyModule.DELETE_GAME_USECASE_PROXY,
        UseCasesProxyModule.GET_GAME_USECASE_PROXY,
      ],
    };
  }
}
