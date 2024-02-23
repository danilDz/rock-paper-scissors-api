import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { JwtConfig } from 'src/domain/config/jwt.interface';
import { LogtailConfig } from 'src/domain/config/logtail.interface';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, LogtailConfig, JwtConfig
{
  constructor(private readonly configService: ConfigService) {}

  getJwtRedisUrl(): string {
    return this.configService.get<string>('JWT_REDIS_URL');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpireTime(): string {
    return this.configService.get<string>('JWT_EXPIRE_TIME');
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
  getLogtailSourceToken(): string {
    return this.configService.get<string>('LOGTAIL_SOURCE_TOKEN');
  }
}
