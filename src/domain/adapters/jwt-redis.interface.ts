export interface IJwtRedisServicePayload {
  username: string;
}

export interface IJwtRedisServiceVerifyResponse {
  username: string;
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
