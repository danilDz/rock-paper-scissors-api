import { Injectable } from '@nestjs/common';
import {
  IJwtRedisService,
  IJwtRedisServicePayload,
  IJwtRedisServiceVerifyResponse,
} from 'src/domain/adapters/jwt-redis.interface';
import { jwt } from 'src/main';

@Injectable()
export class JwtRedisService implements IJwtRedisService {
  async sign(
    payload: IJwtRedisServicePayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return await jwt.sign(payload, secret, { expiresIn });
  }

  async verify(
    token: string,
    secret: string,
  ): Promise<IJwtRedisServiceVerifyResponse> {
    return await jwt.verify(token, secret);
  }

  async destroy(jti: string): Promise<void> {
    await jwt.destroy(jti);
  }
}
