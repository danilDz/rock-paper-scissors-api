import { Module, DynamicModule } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';
import { SignupUseCase } from '../../usecases/auth/signup.usecase';
import { SigninUseCase } from 'src/usecases/auth/signin.usecase';
import { SignoutUseCase } from 'src/usecases/auth/signout.usecase';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtRedisService } from '../services/jwt-redis/jwt-redis.service';
import { EnvironmentConfigService } from '../config/environment/environment-config.service';
import { JwtRedisModule } from '../services/jwt-redis/jwt-redis.module';
import { EnvironmentConfigModule } from '../config/environment/environment-config.module';

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
          inject: [JwtRedisService],
          provide: UseCasesProxyModule.SIGNOUT_USECASE_PROXY,
          useFactory: (jwtRedisService: JwtRedisService) =>
            new UseCaseProxy(new SignoutUseCase(jwtRedisService)),
        },
      ],
      exports: [
        UseCasesProxyModule.SIGNUP_USECASE_PROXY,
        UseCasesProxyModule.SIGNIN_USECASE_PROXY,
        UseCasesProxyModule.SIGNOUT_USECASE_PROXY,
      ],
    };
  }
}
