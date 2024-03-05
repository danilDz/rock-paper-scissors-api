import { Expose, Transform } from 'class-transformer';
import { IJwtRedisServicePayload } from 'src/domain/adapters/jwt-redis.interface';
import { UserStatus } from 'src/domain/models/user';

export class UserDto implements IJwtRedisServicePayload {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  @Transform(({ value }) => UserStatus[value])
  status: UserStatus;

  @Expose()
  isAdmin: boolean;

  @Expose()
  token: string;
}
