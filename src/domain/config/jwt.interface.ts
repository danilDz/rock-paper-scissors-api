export interface JwtConfig {
  getJwtRedisUrl(): string;
  getJwtSecret(): string;
  getJwtExpireTime(): string;
}
