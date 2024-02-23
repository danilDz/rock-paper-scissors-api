import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  firstPlayerId: string;

  @IsNotEmpty()
  @IsString()
  secondPlayerId: string;
}
