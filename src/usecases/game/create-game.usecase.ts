import { ConflictException } from '@nestjs/common';
import { GameRepository } from 'src/domain/repositories/gameRepository.interface';

export class CreateGameUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(firstPlayerId: string, secondPlayerId: string) {
    if (firstPlayerId === secondPlayerId)
      throw new ConflictException(
        'First player ID and Second player ID must not be the same!',
      );
    if (
      await this.gameRepository.getGameByBothPlayerIds(
        firstPlayerId,
        secondPlayerId,
      )
    )
      throw new ConflictException('Game with these players already exist!');
    return await this.gameRepository.createGame(firstPlayerId, secondPlayerId);
  }
}
