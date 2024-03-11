import { Expose, Transform, Type } from 'class-transformer';
import { Choice } from 'src/domain/models/game';
import { UserDto } from '../../auth/dto/user.dto';

export class GameDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserDto)
  firstPlayerId: string;

  @Expose()
  @Type(() => UserDto)
  secondPlayerId: string;

  @Expose()
  firstPlayerScore: number;

  @Expose()
  secondPlayerScore: number;

  @Expose()
  @Transform(({ value }) => Choice[value])
  firstPlayerChoice: Choice;

  @Expose()
  @Transform(({ value }) => Choice[value])
  secondPlayerChoice: Choice;

  @Expose()
  gameNotFound: boolean;

  @Expose()
  message: string;
}
