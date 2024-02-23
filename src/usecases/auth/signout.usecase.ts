import { BadRequestException } from '@nestjs/common';
import { IJwtRedisService } from 'src/domain/adapters/jwt-redis.interface';

export class SignoutUseCase {
  constructor(private readonly jwtRedisService: IJwtRedisService) {}

  async execute(jti: string) {
    try {
      await this.jwtRedisService.destroy(jti);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
