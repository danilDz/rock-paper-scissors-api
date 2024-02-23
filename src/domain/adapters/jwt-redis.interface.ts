import { UserStatus } from '../models/user';

export interface IJwtRedisServicePayload {
  username: string;
  status: UserStatus;
  isAdmin: boolean;
}

export interface IJwtRedisServiceVerifyResponse
  extends IJwtRedisServicePayload {
  jti: string;
  iat: number;
  exp: number;
}

export interface IJwtRedisService {
  sign(
    payload: IJwtRedisServicePayload,
    secret: string,
    expireIn: string,
  ): Promise<string>;
  verify(
    token: string,
    secret: string,
  ): Promise<IJwtRedisServiceVerifyResponse>;
  destroy(jti: string): Promise<void>;
}
