import { Module, DynamicModule } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';
import { SignupUseCase } from '../../usecases/auth/signup.usecases';
import { BcryptService } from '../services/bcrypt/bcrypt.service';

@Module({
  imports: [LoggerModule, RepositoriesModule, BcryptModule],
})
export class UseCasesProxyModule {
  static SIGNUP_USECASE_PROXY = 'SignupUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository, BcryptService],
          provide: UseCasesProxyModule.SIGNUP_USECASE_PROXY,
          useFactory: (
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new SignupUseCase(userRepo, bcryptService)),
        },
      ],
      exports: [UseCasesProxyModule.SIGNUP_USECASE_PROXY],
    };
  }
}
