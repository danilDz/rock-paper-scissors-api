import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './infrastructure/logger/logger.service';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { UseCasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment/environment-config.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { AllExceptionFilter } from './infrastructure/common/filter/all-exceptions.filter';

@Module({
  imports: [
    LoggerModule,
    UseCasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    EnvironmentConfigModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    LoggerService,
  ],
})
export class AppModule {}
