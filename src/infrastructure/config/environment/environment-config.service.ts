import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { LogtailConfig } from 'src/domain/config/logtail.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, LogtailConfig {
  constructor(private readonly configService: ConfigService) {}

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
  getLogtailSourceToken(): string {
    return this.configService.get<string>('LOGTAIL_SOURCE_TOKEN');
  }
}
