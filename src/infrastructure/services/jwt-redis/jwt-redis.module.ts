import { Module } from '@nestjs/common';
import { JwtRedisService } from './jwt-redis.service';

@Module({
  providers: [JwtRedisService],
  exports: [JwtRedisService],
})
export class JwtRedisModule {}
