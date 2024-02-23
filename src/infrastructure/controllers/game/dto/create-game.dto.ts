import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  readonly firstPlayerId: string;

  @IsNotEmpty()
  @IsString()
  readonly secondPlayerId: string;
}
