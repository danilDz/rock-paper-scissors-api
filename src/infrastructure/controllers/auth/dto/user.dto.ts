import { Expose } from 'class-transformer';
import { UserStatus } from 'src/domain/models/user';

export class UserDto {
  @Expose()
  username: string;

  @Expose()
  status: UserStatus;

  @Expose()
  isAdmin: boolean;
}
